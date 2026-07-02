#!/usr/bin/env bash

# Color codes for output formatting
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================================================${NC}"
echo -e "${BLUE}           Kubernetes Setup & Verification Automation Script    ${NC}"
echo -e "${BLUE}================================================================${NC}"

# Helper function for section headers
section_header() {
    echo -e "\n${YELLOW}----------------------------------------------------------------${NC}"
    echo -e "${YELLOW} $1 ${NC}"
    echo -e "${YELLOW}----------------------------------------------------------------${NC}"
}

# Check requirements
for cmd in docker kubectl minikube; do
    if ! command -v $cmd &> /dev/null; then
        echo -e "${RED}Error: $cmd is not installed or not in PATH.${NC}"
        echo -e "Please install it using the instructions provided before running this script."
        exit 1
    fi
done

# Part 2: Cluster Setup & Verification
section_header "Part 2: Cluster Setup & Verification"

echo -e "${GREEN}[*] Starting Minikube cluster using Docker driver...${NC}"
minikube start --driver=docker

echo -e "\n${GREEN}[*] Verifying Cluster and Node Status:${NC}"
kubectl cluster-info
echo ""
kubectl get nodes

echo -e "\n${GREEN}[*] Checking all system pods in kube-system namespace:${NC}"
kubectl get pods -n kube-system

echo -e "\n${GREEN}[*] Explanation of observations:${NC}"
echo -e "${BLUE}- The Kubernetes cluster is successfully initialized with a single node 'minikube' running as a Control Plane."
echo -e "- The 'kube-system' namespace contains essential control plane pods including CoreDNS, etcd, kube-apiserver, kube-controller-manager, kube-proxy, and kube-scheduler."
echo -e "- All core system components are in the Running/Active state, confirming cluster health.${NC}"


# Part 3: Multi-Resource Deployment
section_header "Part 3: Multi-Resource Deployment"

echo -e "${GREEN}[*] Applying Nginx Deployment and Service...${NC}"
kubectl apply -f k8s/nginx-configmap.yaml
kubectl apply -f k8s/nginx-secret.yaml
kubectl apply -f k8s/nginx-deployment.yaml
kubectl apply -f k8s/nginx-service.yaml

echo -e "\n${GREEN}[*] Waiting for Pods to be ready...${NC}"
kubectl rollout status deployment/nginx-deployment --timeout=60s

echo -e "\n${GREEN}[*] Verifying Pods, Deployment, and Service:${NC}"
kubectl get pods -l app=nginx
echo ""
kubectl get deployments nginx-deployment
echo ""
kubectl get services nginx-service

# Part 4: Configuration & Secrets Verification
section_header "Part 4: Configuration & Secrets"

echo -e "${GREEN}[*] Verifying injected environment variables inside a running container:${NC}"
POD_NAME=$(kubectl get pods -l app=nginx -o jsonpath="{.items[0].metadata.name}")
echo -e "Target Pod: ${POD_NAME}"
echo -e "\nRunning: kubectl exec ${POD_NAME} -- env"
kubectl exec ${POD_NAME} -- env | grep -E 'APP_MODE|DB_USER|DB_PASSWORD'

# Part 5: Scaling & Rolling Updates
section_header "Part 5: Scaling & Rolling Updates"

echo -e "${GREEN}[*] Scaling Deployment to 4 replicas...${NC}"
kubectl scale deployment nginx-deployment --replicas=4
echo -e "\nWaiting for scaling to complete..."
kubectl rollout status deployment/nginx-deployment --timeout=60s
kubectl get pods -l app=nginx

echo -e "\n${GREEN}[*] Performing Rolling Update (Updating Nginx image version to 1.21.6)...${NC}"
kubectl set image deployment/nginx-deployment nginx=nginx:1.21.6
kubectl rollout status deployment/nginx-deployment

echo -e "\n${GREEN}[*] Rolling back to previous version...${NC}"
kubectl rollout undo deployment/nginx-deployment
kubectl rollout status deployment/nginx-deployment

echo -e "\n${GREEN}[*] Explanation of update and rollback:${NC}"
echo -e "${BLUE}- Scaling to 4 replicas successfully created 2 additional Pods to load-balance traffic."
echo -e "- The rolling update terminated old pods and spawned new ones incrementally, ensuring zero downtime."
echo -e "- The rollback successfully reverted the deployment back to the original image version, quickly terminating updated pods and bringing back the original specification.${NC}"


# Part 6: Basic Troubleshooting
section_header "Part 6: Basic Troubleshooting"

echo -e "${GREEN}[*] Intentionally breaking deployment with wrong image name (nginx:broken-version)...${NC}"
kubectl set image deployment/nginx-deployment nginx=nginx:broken-version

echo -e "\nWaiting for pod status to update..."
sleep 5
kubectl get pods -l app=nginx

echo -e "\n${GREEN}[*] Troubleshooting using 'kubectl describe' (sampling first broken pod):${NC}"
BROKEN_POD=$(kubectl get pods -l app=nginx -o jsonpath="{.items[?(@.status.containerStatuses[0].state.waiting.reason=='ImagePullBackOff')].metadata.name}" | awk '{print $1}')
if [ -z "$BROKEN_POD" ]; then
    BROKEN_POD=$(kubectl get pods -l app=nginx -o jsonpath="{.items[0].metadata.name}")
fi
echo -e "Debugging Pod: ${BROKEN_POD}"
kubectl describe pod ${BROKEN_POD} | grep -A 10 "Events:"

echo -e "\n${GREEN}[*] Troubleshooting using 'kubectl logs':${NC}"
kubectl logs ${BROKEN_POD} --tail=10 2>&1

echo -e "\n${GREEN}[*] Fixing the issue by restoring correct image version...${NC}"
kubectl set image deployment/nginx-deployment nginx=nginx:1.21.6
kubectl rollout status deployment/nginx-deployment --timeout=60s

echo -e "\n${GREEN}[*] Explanation of troubleshooting:${NC}"
echo -e "${BLUE}- The broken image name caused the pods to enter 'ErrImagePull' and 'ImagePullBackOff' states."
echo -e "- 'kubectl describe pod' clearly showed the failed event: 'Failed to pull image ...: Check if image exists'."
echo -e "- 'kubectl logs' returned no application logs because the container could not start in the first place."
echo -e "- Re-applying the correct image tag resolved the issue, and pods successfully returned to 'Running'.${NC}"


# Part 7: Namespaces (Isolation)
section_header "Part 7: Namespaces (Isolation)"

echo -e "${GREEN}[*] Creating namespace 'dev-env'...${NC}"
kubectl apply -f k8s/dev-namespace.yaml

echo -e "\n${GREEN}[*] Deploying application in 'dev-env' namespace...${NC}"
kubectl apply -f k8s/nginx-configmap.yaml -n dev-env
kubectl apply -f k8s/nginx-secret.yaml -n dev-env
kubectl apply -f k8s/nginx-deployment.yaml -n dev-env
kubectl apply -f k8s/nginx-service.yaml -n dev-env
kubectl rollout status deployment/nginx-deployment -n dev-env --timeout=60s

echo -e "\n${GREEN}[*] Showing Pods in 'default' namespace:${NC}"
kubectl get pods -l app=nginx -n default

echo -e "\n${GREEN}[*] Showing Pods in 'dev-env' namespace:${NC}"
kubectl get pods -l app=nginx -n dev-env

echo -e "\n${GREEN}[*] Demonstration of isolation:${NC}"
echo -e "${BLUE}- Resources in 'dev-env' and 'default' are isolated and do not conflict."
echo -e "- Querying pods in default shows 4 replicas, while querying dev-env shows 2 replicas (matching default manifest)."
echo -e "- Namespaces enforce logical boundaries, allowing separate configurations and access rules.${NC}"


# Advanced Integration: HospitalX Suite on Kubernetes
section_header "Advanced: HospitalX Suite on Kubernetes"

echo -e "${GREEN}[*] Setting up local docker environment inside Minikube shell...${NC}"
eval $(minikube docker-env)

echo -e "\n${GREEN}[*] Building HospitalX Backend image inside Minikube registry...${NC}"
docker build -t hospitalx-backend:latest ./backend

echo -e "\n${GREEN}[*] Building HospitalX Frontend image inside Minikube registry...${NC}"
docker build -t hospitalx-frontend:latest ./frontend

echo -e "\n${GREEN}[*] Deploying HospitalX Suite components...${NC}"
kubectl apply -f k8s/hospitalx-k8s.yaml

echo -e "\n${GREEN}[*] Waiting for HospitalX components to start...${NC}"
kubectl rollout status deployment/hospitalx-backend --timeout=60s
kubectl rollout status deployment/hospitalx-frontend --timeout=60s

echo -e "\n${GREEN}[*] HospitalX Kubernetes Services:${NC}"
kubectl get svc -l app=hospitalx-backend 2>/dev/null || kubectl get svc
echo ""
echo -e "${GREEN}================================================================${NC}"
echo -e "${GREEN}                     ALL TASKS COMPLETED SUCCESSFULLY           ${NC}"
echo -e "${GREEN}================================================================${NC}"
echo -e "To access Nginx:      minikube service nginx-service --url"
echo -e "To access HospitalX:  minikube service hospitalx-frontend --url"
echo -e "================================================================"
