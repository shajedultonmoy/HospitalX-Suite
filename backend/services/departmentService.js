const { Department } = require('../models');

exports.findDepartments = async ({ search } = {}) => {
  const departments = await Department.findAll({ order: [['name', 'ASC']] });
  if (!search) return departments;

  return departments.filter((department) =>
    `${department.name} ${department.description}`.toLowerCase().includes(search.toLowerCase())
  );
};

exports.createDepartment = (payload) => Department.create(payload);

exports.updateDepartment = async (id, payload) => {
  const department = await Department.findByPk(id);
  if (!department) return null;
  return department.update(payload);
};

exports.deleteDepartment = async (id) => {
  const department = await Department.findByPk(id);
  if (!department) return false;
  await department.destroy();
  return true;
};
