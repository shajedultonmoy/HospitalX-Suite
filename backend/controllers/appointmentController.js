const { Appointment, Doctor, Department, User } = require('../models');
const { requireFields } = require('../utils/validators');

exports.getAppointments = async (req, res) => {
  try {
    const where = {};
    if (req.user.role === 'Patient') {
      where.patient_id = req.user.id;
    }

    const appointments = await Appointment.findAll({
      where,
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Doctor, include: [{ model: Department, attributes: ['name'] }] }
      ],
      order: [['date', 'DESC']]
    });

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

    const patientId = req.body.patient_id || req.user?.id;
    if (!patientId) {
      return res.status(400).json({ message: 'patient_id is required' });
    }

    const doctor = await Doctor.findByPk(req.body.doctor_id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const appointment = await Appointment.create({
      patient_id: patientId,
      doctor_id: req.body.doctor_id,
      date: req.body.date,
      notes: req.body.notes,
      status: 'Pending'
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    await appointment.update(req.body);
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    await appointment.destroy();
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
