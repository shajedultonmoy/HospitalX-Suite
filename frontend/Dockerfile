# Build stage
FROM node:20 AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Set API URL build arg (Vite injects this at build-time)
ARG VITE_API_URL=http://localhost:30050/api
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Production stage
FROM nginx:alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output to Nginx web root
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
