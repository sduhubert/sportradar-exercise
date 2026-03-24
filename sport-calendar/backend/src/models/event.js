const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  starts_at: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'events',
  timestamps: false
});

module.exports = Event;