const { Medicine } = require('../models');
const { requireFields } = require('../utils/validators');

exports.getMedicines = async (req, res) => {
  try {
    const { search, category, sort = 'name' } = req.query;
    const medicines = await Medicine.findAll({
      order: [[['name', 'category', 'stock'].includes(sort) ? sort : 'name', 'ASC']]
    });

    const filtered = medicines.filter((medicine) => {
      const haystack = `${medicine.name} ${medicine.category} ${medicine.usage} ${medicine.description}`.toLowerCase();
      const matchesSearch = !search || haystack.includes(search.toLowerCase());
      const matchesCategory = !category || medicine.category?.toLowerCase() === category.toLowerCase();
      return matchesSearch && matchesCategory;
    });

    res.json(filtered);
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
    const medicine = await Medicine.create(req.body);
    res.status(201).json(medicine);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByPk(req.params.id);
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    await medicine.update(req.body);
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByPk(req.params.id);
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    await medicine.destroy();
    res.json({ message: 'Medicine deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
