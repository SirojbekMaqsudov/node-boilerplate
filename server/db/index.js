const { Sequelize } = require('sequelize');
const {Config} = require("../config");

const sequelize = new Sequelize(
  Config.db.DB_NAME,
  Config.db.DB_USER,
  Config.db.DB_PASSWORD,
  {
    host: Config.db.DB_HOST,
    dialect: 'postgres',
    port: Config.db.DB_PORT
  }
)

module.exports.sequelize = sequelize;
