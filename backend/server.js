require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

// Routes
const authRoutes = require('./routes/authRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Health Check
app.get('/', (req, res) => {
  res.json({ status: 'HospitalX API is running', timestamp: new Date() });
});

// Routes middleware
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Sync Database and Start Server
sequelize.sync({ alter: process.env.DB_SYNC_ALTER !== 'false' }).then(() => {
  console.log(`Database connected and synced (Mode: ${process.env.NODE_ENV || 'development'})`);
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Database connection failed:', err);
});
