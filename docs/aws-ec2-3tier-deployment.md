# HospitalX Suite AWS EC2 3-Tier Deployment

This guide deploys HospitalX Suite as three independent EC2 tiers:

```text
[EC2-1: Frontend]
React Vite build + Nginx
Public HTTP/HTTPS
        |
        | HTTPS API calls
        v
[EC2-2: Backend]
Node.js + Express + PM2
Public API or private behind load balancer
        |
        | MySQL over private IP only
        v
[EC2-3: Database]
MySQL Server
Private access from EC2-2 only
```

## 1. AWS Network Layout

Put all three EC2 instances in the same VPC. Use private IPs for backend-to-database traffic.

Recommended security groups:

| Tier | Inbound Rules | Source |
| --- | --- | --- |
| EC2-1 Frontend | `80`, `443` | `0.0.0.0/0` |
| EC2-1 Frontend | `22` | Your admin IP only |
| EC2-2 Backend | `5000` or `443` | EC2-1 security group or load balancer security group |
| EC2-2 Backend | `22` | Your admin IP only |
| EC2-3 Database | `3306` | EC2-2 security group or EC2-2 private IP only |
| EC2-3 Database | `22` | Your admin IP only, preferably temporary |

Do not allow `3306` from `0.0.0.0/0`. The database instance should not be used by the frontend.

## 2. EC2-3 Database Setup

Install MySQL:

```bash
sudo apt update
sudo apt install mysql-server -y
sudo systemctl enable mysql
sudo systemctl start mysql
sudo mysql_secure_installation
```

Bind MySQL to EC2-3 private IP:

```bash
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
```

Set:

```ini
bind-address = EC2_3_PRIVATE_IP
```

Restart MySQL:

```bash
sudo systemctl restart mysql
```

Create the app database and user:

```bash
sudo mysql -u root -p
```

```sql
CREATE DATABASE hospitalx_suite CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER 'hospitalx_app'@'EC2_2_PRIVATE_IP' IDENTIFIED BY 'replace_with_strong_password';

GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, INDEX, REFERENCES
ON hospitalx_suite.*
TO 'hospitalx_app'@'EC2_2_PRIVATE_IP';

DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');
FLUSH PRIVILEGES;
```

Load the schema and seed data:

```bash
mysql -u root -p hospitalx_suite < backend/database/schema.sql
mysql -u root -p hospitalx_suite < backend/database/seed.sql
```

If the SQL files are not on EC2-3 yet, copy them from your machine or from the backend repo:

```bash
scp -i your-key.pem backend/database/schema.sql ubuntu@EC2_3_PUBLIC_IP:/tmp/schema.sql
scp -i your-key.pem backend/database/seed.sql ubuntu@EC2_3_PUBLIC_IP:/tmp/seed.sql
mysql -u root -p hospitalx_suite < /tmp/schema.sql
mysql -u root -p hospitalx_suite < /tmp/seed.sql
```

Enable UFW on EC2-3:

```bash
sudo ufw allow from EC2_2_PRIVATE_IP to any port 3306 proto tcp
sudo ufw allow from YOUR_ADMIN_IP to any port 22 proto tcp
sudo ufw enable
sudo ufw status
```

## 3. EC2-2 Backend Setup

Install Node.js and PM2:

```bash
sudo apt update
sudo apt install -y curl build-essential
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

Deploy the backend folder, then install dependencies:

```bash
cd /var/www/hospitalx/backend
npm install
```

Create `/var/www/hospitalx/backend/.env`:

```env
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=1d

DB_DIALECT=mysql
DB_HOST=EC2_3_PRIVATE_IP
DB_PORT=3306
DB_NAME=hospitalx_suite
DB_USER=hospitalx_app
DB_PASSWORD=replace_with_strong_password
DB_POOL_MAX=10
DB_POOL_MIN=0
DB_POOL_ACQUIRE=30000
DB_POOL_IDLE=10000
DB_SSL=false
DB_SYNC_ALTER=false
```

Test database connectivity from EC2-2:

```bash
sudo apt install mysql-client -y
mysql -h EC2_3_PRIVATE_IP -P 3306 -u hospitalx_app -p hospitalx_suite
```

Start the API with PM2:

```bash
pm2 start server.js --name hospitalx-api
pm2 save
pm2 startup
```

Enable UFW on EC2-2:

```bash
sudo ufw allow from EC2_1_PRIVATE_IP to any port 5000 proto tcp
sudo ufw allow from YOUR_ADMIN_IP to any port 22 proto tcp
sudo ufw enable
```

If the frontend calls the backend over the internet, allow API traffic from the frontend public IP, reverse proxy, or load balancer instead of `EC2_1_PRIVATE_IP`.

## 4. EC2-1 Frontend Setup

Install Node.js and Nginx:

```bash
sudo apt update
sudo apt install -y nginx curl
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

Create `frontend/.env.production` before building:

```env
VITE_API_URL=https://your-api-domain.com/api
```

For a simple public EC2 backend without a domain:

```env
VITE_API_URL=http://EC2_2_PUBLIC_IP:5000/api
```

Build and publish:

```bash
cd /var/www/hospitalx/frontend
npm install
npm run build
sudo rm -rf /var/www/hospitalx-site
sudo mkdir -p /var/www/hospitalx-site
sudo cp -r dist/* /var/www/hospitalx-site/
```

Configure Nginx:

```bash
sudo nano /etc/nginx/sites-available/hospitalx
```

```nginx
server {
    listen 80;
    server_name your-frontend-domain.com;

    root /var/www/hospitalx-site;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://EC2_2_PRIVATE_IP:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/hospitalx /etc/nginx/sites-enabled/hospitalx
sudo nginx -t
sudo systemctl reload nginx
```

Enable UFW on EC2-1:

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow from YOUR_ADMIN_IP to any port 22 proto tcp
sudo ufw enable
```

## 5. Node.js DB Connection Code

HospitalX uses Sequelize in `backend/config/db.js`:

```js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    dialect: 'mysql',
    logging: false,
    define: { underscored: true },
    pool: {
      max: Number(process.env.DB_POOL_MAX || 10),
      min: Number(process.env.DB_POOL_MIN || 0),
      acquire: Number(process.env.DB_POOL_ACQUIRE || 30000),
      idle: Number(process.env.DB_POOL_IDLE || 10000)
    }
  }
);

module.exports = sequelize;
```

## 6. Data Flow Validation

From a browser:

```text
Browser -> EC2-1 Nginx -> EC2-2 Express API -> EC2-3 MySQL
```

Validate each hop:

```bash
# EC2-1
curl http://EC2_2_PRIVATE_IP:5000/

# EC2-2
curl http://localhost:5000/
mysql -h EC2_3_PRIVATE_IP -u hospitalx_app -p hospitalx_suite

# EC2-3
sudo ss -tlnp | grep 3306
sudo tail -f /var/log/mysql/error.log
```

Expected API health response:

```json
{
  "status": "HospitalX API is running"
}
```

## 7. HTTPS

Recommended production options:

- Use an Application Load Balancer with ACM certificates.
- Or install Certbot on EC2-1 and optionally EC2-2 if the API is public.

For Nginx with Certbot:

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-frontend-domain.com
```

## 8. Backups

Simple MySQL dump backup:

```bash
mysqldump -u root -p hospitalx_suite > hospitalx_suite_$(date +%F).sql
```

Production recommendations:

- Store backups in S3.
- Automate daily backups with cron.
- Test restore regularly.
- Consider AWS RDS for managed backups, patching, monitoring, and easier failover.

## 9. Troubleshooting

`ECONNREFUSED` from backend:

- MySQL is not running on EC2-3.
- `bind-address` is wrong.
- Security group or UFW blocks `3306`.

`ER_ACCESS_DENIED_ERROR`:

- Wrong DB username/password.
- MySQL user host is not `EC2_2_PRIVATE_IP`.
- Privileges were not flushed.

Frontend cannot call API:

- `VITE_API_URL` points to the wrong backend host.
- Backend CORS `FRONTEND_URL` does not match the frontend origin.
- EC2-2 security group does not allow the frontend source.

React route refresh returns 404:

- Nginx is missing `try_files $uri $uri/ /index.html;`.

PM2 app starts then stops:

```bash
pm2 logs hospitalx-api
node server.js
```

Check `.env`, database connectivity, and missing dependencies.
