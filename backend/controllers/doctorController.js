const { requireFields } = require('../utils/validators');
const doctorService = require('../services/doctorService');

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await doctorService.findDoctors(req.query);
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createDoctor = async (req, res) => {
  try {
    const { name, specialization, schedule, contact, department_id } = req.body;
    const validationError = requireFields(req.body, ['name', 'specialization', 'department_id']);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const doctor = await doctorService.createDoctor({
      name,
      specialization,
      schedule,
      contact,
      department_id
    });
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await doctorService.updateDoctor(req.params.id, req.body);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const deleted = await doctorService.deleteDoctor(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
