const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Appointment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    date: { type: DataTypes.DATE, allowNull: false },
    status: {
      type: DataTypes.ENUM('Pending', 'Confirmed', 'Cancelled'),
      defaultValue: 'Pending'
    },
    notes: { type: DataTypes.TEXT }
  });
};
