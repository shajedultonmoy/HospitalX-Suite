const { Appointment, Doctor, Department, User } = require('../models');

exports.findAppointments = ({ user }) => {
  const where = {};
  if (user.role === 'Patient') {
    where.patient_id = user.id;
  }

  return Appointment.findAll({
    where,
    include: [
      { model: User, attributes: ['id', 'name', 'email'] },
      { model: Doctor, include: [{ model: Department, attributes: ['name'] }] }
    ],
    order: [['date', 'DESC']]
  });
};

exports.createAppointment = async ({ user, payload }) => {
  const doctor = await Doctor.findByPk(payload.doctor_id);
  if (!doctor) return null;

  return Appointment.create({
    patient_id: payload.patient_id || user.id,
    doctor_id: payload.doctor_id,
    date: payload.date,
    notes: payload.notes,
    status: 'Pending'
  });
};

exports.updateAppointment = async (id, payload) => {
  const appointment = await Appointment.findByPk(id);
  if (!appointment) return null;
  return appointment.update(payload);
};

exports.deleteAppointment = async (id) => {
  const appointment = await Appointment.findByPk(id);
  if (!appointment) return false;
  await appointment.destroy();
  return true;
};
