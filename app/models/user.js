const { DataTypes } = require('sequelize');
const {sequelize} = require("@server/db");
const {ROLE, ROLES} = require("@utils/consts");

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^[0-9]{12}$/
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM(ROLES),
    defaultValue: ROLE.USER
  }
}, {
  tableName: 'users',
  timestamps: true
})

module.exports = {User};