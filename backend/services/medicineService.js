const { Medicine } = require('../models');

const allowedSortFields = ['name', 'category', 'stock'];

exports.findMedicines = async ({ search, category, sort = 'name' }) => {
  const medicines = await Medicine.findAll({
    order: [[allowedSortFields.includes(sort) ? sort : 'name', 'ASC']]
  });

  return medicines.filter((medicine) => {
    const haystack = `${medicine.name} ${medicine.category} ${medicine.usage} ${medicine.description}`.toLowerCase();
    const matchesSearch = !search || haystack.includes(search.toLowerCase());
    const matchesCategory = !category || medicine.category?.toLowerCase() === category.toLowerCase();
    return matchesSearch && matchesCategory;
  });
};

exports.createMedicine = (payload) => Medicine.create(payload);

exports.updateMedicine = async (id, payload) => {
  const medicine = await Medicine.findByPk(id);
  if (!medicine) return null;
  return medicine.update(payload);
};

exports.deleteMedicine = async (id) => {
  const medicine = await Medicine.findByPk(id);
  if (!medicine) return false;
  await medicine.destroy();
  return true;
};
