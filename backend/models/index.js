const sequelize = require('../config/db');

const User = require('./User')(sequelize);
const Doctor = require('./Doctor')(sequelize);
const Department = require('./Department')(sequelize);
const Medicine = require('./Medicine')(sequelize);
const Appointment = require('./Appointment')(sequelize);

// Define Relationships
User.hasMany(Appointment, { foreignKey: 'patient_id' });
Appointment.belongsTo(User, { foreignKey: 'patient_id' });

Doctor.hasMany(Appointment, { foreignKey: 'doctor_id' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctor_id' });

Department.hasMany(Doctor, { foreignKey: 'department_id' });
Doctor.belongsTo(Department, { foreignKey: 'department_id' });

module.exports = {
  sequelize,
  User,
  Doctor,
  Department,
  Medicine,
  Appointment
};
