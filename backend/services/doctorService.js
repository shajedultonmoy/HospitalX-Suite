const { Doctor, Department } = require('../models');

const allowedSortFields = ['name', 'specialization', 'schedule'];

exports.findDoctors = async ({ search, department, sort = 'name' }) => {
  const doctors = await Doctor.findAll({
    include: [{ model: Department, attributes: ['id', 'name'] }],
    order: [[allowedSortFields.includes(sort) ? sort : 'name', 'ASC']]
  });

  return doctors.filter((doctor) => {
    const departmentName = doctor.Department?.name || '';
    const matchesSearch = !search || `${doctor.name} ${doctor.specialization} ${departmentName}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesDepartment = !department || departmentName.toLowerCase() === department.toLowerCase();
    return matchesSearch && matchesDepartment;
  });
};

exports.createDoctor = (payload) => Doctor.create(payload);

exports.updateDoctor = async (id, payload) => {
  const doctor = await Doctor.findByPk(id);
  if (!doctor) return null;
  return doctor.update(payload);
};

exports.deleteDoctor = async (id) => {
  const doctor = await Doctor.findByPk(id);
  if (!doctor) return false;
  await doctor.destroy();
  return true;
};
