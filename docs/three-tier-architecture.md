# HospitalX Suite 3-Tier Architecture

## Architecture Diagram

```text
Presentation Layer
React + Tailwind + Nginx
Server 1 / CDN
        |
        | HTTPS REST calls only
        v
Application Layer
Node.js + Express API + Sequelize
Server 2 / private app subnet
        |
        | MySQL protocol over private network only
        v
Data Layer
MySQL 8 container, VM, or AWS RDS
Server 3 / private DB subnet
```

## Separation Rules

- Frontend calls only `VITE_API_URL`, for example `https://api.hospitalx.com/api`.
- Backend is the only tier that knows DB host, username, password, and database name.
- MySQL must not be publicly reachable from browsers or the internet.
- Routes stay thin, controllers handle HTTP, services handle business/data operations, and models define schema.

## Local 3-Tier Setup With Docker MySQL

1. Start the independent data layer:

```powershell
docker compose -f docker-compose.db.yml up -d
```

2. Create `backend/.env` from `backend/.env.example` and use the container port:

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=replace_with_a_long_random_secret

DB_DIALECT=mysql
DB_HOST=127.0.0.1
DB_PORT=3307
DB_NAME=hospitalx_suite
DB_USER=hospitalx_app
DB_PASSWORD=change_me_app_password
DB_POOL_MAX=10
DB_SSL=false
```

3. Start the backend API:

```powershell
cd backend
npm.cmd run dev
```

4. Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

5. Start the presentation layer:

```powershell
cd frontend
npm.cmd run dev
```

## AWS 3-Tier Deployment

- Tier 1: React production build served by Nginx on EC2, S3 + CloudFront, or another static host.
- Tier 2: Node.js API on a separate EC2 instance, ECS service, or Elastic Beanstalk environment.
- Tier 3: MySQL on AWS RDS in private subnets.

Recommended security group rules:

- Frontend: allow `80/443` from internet.
- Backend: allow `443` or API port only from frontend/load balancer security group.
- Database: allow `3306` only from backend security group.
- Database: no public IPv4 access.

## Backend Database Connection

The backend uses Sequelize and `mysql2` with connection pooling in `backend/config/db.js`.

Relevant environment variables:

```env
DB_DIALECT=mysql
DB_HOST=my-rds-endpoint.amazonaws.com
DB_PORT=3306
DB_NAME=hospitalx_suite
DB_USER=hospitalx_app
DB_PASSWORD=strong_password
DB_POOL_MAX=10
DB_POOL_MIN=0
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=true
```

## Security Checklist

- Use strong DB credentials and never commit `.env`.
- Use a least-privilege DB user for the backend.
- Enable SSL for cloud MySQL/RDS.
- Keep `3306` private to the backend server/security group.
- Rotate `JWT_SECRET` and DB passwords for real deployments.
- Keep validation in controllers/services and never trust frontend input.
- Use HTTPS between users and frontend/backend.
- Disable destructive schema sync in production by setting `DB_SYNC_ALTER=false`.

## Folder Structure

```text
frontend/
  src/
    pages/
    components/
    services/api.js

backend/
  config/db.js
  models/
  services/
  controllers/
  routes/
  middleware/
  database/schema.sql
  database/seed.sql

docker-compose.db.yml
docs/three-tier-architecture.md
```
