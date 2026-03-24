const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Sport = sequelize.define('Sport', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'sports',
  timestamps: false
});

module.exports = Sport;