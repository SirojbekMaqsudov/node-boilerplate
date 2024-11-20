// server/config/config.js
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER, // You can set defaults for local development
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_USER, // You can set defaults for local development
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USER, // You can set defaults for local development
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
};
