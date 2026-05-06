const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Doctor', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: false
    },
    schedule: {
      type: DataTypes.STRING, // e.g., "Mon-Fri 9AM-5PM"
      allowNull: true
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
};
