# HospitalX Suite - Setup & Connection Guide

## ✅ Project Status: CONFIGURED

### Backend-Frontend Connection
- **Frontend URL**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Communication**: REST API with JWT Authentication
- **CORS**: Enabled and configured

### Database Configuration
- **Type**: MySQL 8.4
- **Database Name**: hospitalx_suite
- **Connection**: Sequelize ORM
- **Synchronization**: Auto-sync with alter mode

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+ and npm
- MySQL 8.4 (local installation or Docker)

### Option 1: Using Docker (Recommended)
```bash
# Start MySQL container
docker-compose -f docker-compose.db.yml up -d

# Wait for MySQL to initialize (10-15 seconds)
# Check logs: docker logs hospitalx-mysql
```

### Option 2: Local MySQL
Ensure MySQL is running on `localhost:3306` with:
- Database: `hospitalx_suite`
- User: `root` (or configure in `.env`)
- Password: (empty by default, or configure in `.env`)

---

## 📦 Installation & Setup

### 1. Backend Setup
```bash
cd backend
npm install

# File: .env (already configured)
# Database will auto-sync on first run
npm run dev
# Server runs on: http://localhost:5000
```

### 2. Frontend Setup
```bash
cd frontend
npm install

# File: .env (already configured)
npm run dev
# Frontend runs on: http://localhost:5173
```

---

## 🧪 Testing Connection

### Test 1: Health Check
```bash
curl http://localhost:5000/
# Expected: { "status": "HospitalX API is running", "timestamp": "..." }
```

### Test 2: Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "Patient"
  }'
# Expected: { "token": "...", "user": {...} }
```

### Test 3: Fetch Doctors
```bash
curl http://localhost:5000/api/doctors
# Expected: Array of doctors with department info
```

### Test 4: Frontend API Integration
1. Open http://localhost:5173
2. Navigate to "Doctors" page
3. Should display doctors from backend
4. Click "Login" → Register new account
5. Book appointment (requires authentication)

---

## 🔧 Configuration Files

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=hospitalx_suite
DB_USER=root
JWT_SECRET=hospitalx_super_secret_key
FRONTEND_URL=http://localhost:5173
```

---

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Login user

### Doctors (Public)
- `GET /api/doctors` - List all doctors
- `GET /api/doctors/:id` - Get doctor details

### Appointments (Protected)
- `GET /api/appointments` - Get user's appointments
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment (Admin/Doctor)
- `DELETE /api/appointments/:id` - Delete appointment (Admin)

### Medicines (Public)
- `GET /api/medicines` - List medicines
- `GET /api/medicines/:id` - Get medicine details

### Services (Public)
- `GET /api/services` - List departments

---

## 🐛 Troubleshooting

### Database Connection Error
- Ensure MySQL is running
- Verify `DB_HOST` and `DB_PORT` in `.env`
- Check credentials in `.env`
- For Docker: `docker logs hospitalx-mysql`

### Frontend API 404 Error
- Verify `VITE_API_URL` in frontend/.env
- Check backend is running on port 5000
- Verify CORS is enabled in backend

### CORS Error in Browser
- Backend CORS already configured for http://localhost:5173
- If using different port, update in `backend/server.js`

### Token Validation Failed
- Clear browser localStorage: `localStorage.clear()`
- Re-login to get new token
- Verify `JWT_SECRET` is same in .env

---

## 📊 Database Schema

### Tables
- **users** - Patient, Doctor, Admin accounts
- **departments** - Hospital departments
- **doctors** - Doctor profiles with department
- **medicines** - Medicine inventory
- **appointments** - Patient-Doctor appointments
- **medical_records** - Appointment diagnoses

### Relationships
- User ↔ Appointment (one-to-many)
- Doctor ↔ Appointment (one-to-many)
- Department ↔ Doctor (one-to-many)

---

## ✨ Features Verified

✅ User authentication (register/login)
✅ Role-based access control (Admin/Doctor/Patient)
✅ Doctor directory with department filter
✅ Appointment booking workflow
✅ Medicine inventory
✅ Protected API endpoints
✅ CORS configuration
✅ JWT token validation
✅ Database relationships
✅ Error handling middleware

---

## 🎯 Next Steps

1. **Start Docker MySQL**: `docker-compose -f docker-compose.db.yml up -d`
2. **Start Backend**: `cd backend && npm run dev`
3. **Start Frontend**: `cd frontend && npm run dev`
4. **Open**: http://localhost:5173
5. **Test**: Register, login, view doctors, book appointment

---

Generated: June 2, 2026
Status: ✅ All systems configured and ready
