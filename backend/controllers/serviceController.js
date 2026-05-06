const { requireFields } = require('../utils/validators');
const departmentService = require('../services/departmentService');

exports.getServices = async (req, res) => {
  try {
    const services = await departmentService.findDepartments(req.query);
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createService = async (req, res) => {
  try {
    const validationError = requireFields(req.body, ['name', 'description']);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }
    const service = await departmentService.createDepartment(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const service = await departmentService.updateDepartment(req.params.id, req.body);
    if (!service) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const deleted = await departmentService.deleteDepartment(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
