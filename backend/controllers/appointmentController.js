const { requireFields } = require('../utils/validators');
const appointmentService = require('../services/appointmentService');

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await appointmentService.findAppointments({ user: req.user });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const validationError = requireFields(req.body, ['doctor_id', 'date']);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const appointment = await appointmentService.createAppointment({ user: req.user, payload: req.body });
    if (!appointment) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await appointmentService.updateAppointment(req.params.id, req.body);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const deleted = await appointmentService.deleteAppointment(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
