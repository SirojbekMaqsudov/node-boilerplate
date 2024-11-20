'use strict';
require('module-alias/register');
const {ROLES, ROLE} = require("@app/utils/consts");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: /^[0-9]{12}$/,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM(ROLES),
        allowNull: false,
        defaultValue: ROLE.USER,
      },
    }, {
      timestamps: true,
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable('users')
  }
};
