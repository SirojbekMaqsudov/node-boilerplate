'use strict';
require('module-alias/register');
require('dotenv').config();
const bcrypt = require('bcrypt');
const {ROLE} = require("@app/utils/consts");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    const hashPassword = await bcrypt.hash(process.env.SECRET_KEY, 10);

    await queryInterface.bulkInsert('users', [
      {
        full_name: 'Sirojbek',
        phone_number: '998931782807',
        password: hashPassword,
        role: ROLE.ADMIN,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('users', {phone_number: '998931782807'});
  }
};
