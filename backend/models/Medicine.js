const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Medicine', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: { type: DataTypes.STRING, allowNull: false },
    usage: { type: DataTypes.TEXT },
    category: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    dosage: { type: DataTypes.STRING },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 }
  });
};
