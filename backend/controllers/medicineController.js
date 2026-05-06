const { requireFields } = require('../utils/validators');
const medicineService = require('../services/medicineService');

exports.getMedicines = async (req, res) => {
  try {
    const medicines = await medicineService.findMedicines(req.query);
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createMedicine = async (req, res) => {
  try {
    const validationError = requireFields(req.body, ['name', 'category', 'usage']);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }
    const medicine = await medicineService.createMedicine(req.body);
    res.status(201).json(medicine);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateMedicine = async (req, res) => {
  try {
    const medicine = await medicineService.updateMedicine(req.params.id, req.body);
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteMedicine = async (req, res) => {
  try {
    const deleted = await medicineService.deleteMedicine(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.json({ message: 'Medicine deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
