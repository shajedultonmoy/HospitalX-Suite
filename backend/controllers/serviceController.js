const { Department } = require('../models');
const { requireFields } = require('../utils/validators');

exports.getServices = async (req, res) => {
  try {
    const { search } = req.query;
    const allServices = await Department.findAll({ order: [['name', 'ASC']] });
    const services = search
      ? allServices.filter((service) => `${service.name} ${service.description}`.toLowerCase().includes(search.toLowerCase()))
      : allServices;
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
    const service = await Department.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const service = await Department.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Department not found' });
    }
    await service.update(req.body);
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Department.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Department not found' });
    }
    await service.destroy();
    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
