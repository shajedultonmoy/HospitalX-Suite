const express = require('express');
const router = express.Router();
const {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointmentController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, getAppointments);
router.post('/', protect, authorize('Admin', 'Doctor', 'Patient'), createAppointment);
router.put('/:id', protect, authorize('Admin', 'Doctor'), updateAppointment);
router.delete('/:id', protect, authorize('Admin'), deleteAppointment);

module.exports = router;
