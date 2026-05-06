const { Doctor, Department } = require('../models');
const { requireFields } = require('../utils/validators');

exports.getDoctors = async (req, res) => {
  try {
    const { search, department, sort = 'name' } = req.query;
    const where = {};
    const include = [{ model: Department, attributes: ['id', 'name'] }];

    const doctors = await Doctor.findAll({
      where,
      include,
      order: [[['name', 'specialization', 'schedule'].includes(sort) ? sort : 'name', 'ASC']]
    });

    const filteredDoctors = doctors.filter((doctor) => {
      const departmentName = doctor.Department?.name || '';
      const matchesSearch = !search || `${doctor.name} ${doctor.specialization} ${departmentName}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesDepartment = !department || departmentName.toLowerCase() === department.toLowerCase();
      return matchesSearch && matchesDepartment;
    });

    res.json(filteredDoctors);
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

    const doctor = await Doctor.create({
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
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    await doctor.update(req.body);
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    await doctor.destroy();
    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
