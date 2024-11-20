const express = require('express');
const cors = require('cors');
const {Config} = require("./config");
const {sequelize} = require("./db");
const app = express();
require('dotenv').config();
require('module-alias/register');
const {envChecker} = require("@utils/env-checker");
envChecker();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: "*"}));

//Routes
const Router = require('@routes/index');
app.use('/api/v1', Router);

//Error Handler
const ErrorMiddleware = require('@middlewares/error');
app.use(ErrorMiddleware);

const start = async () => {
  try {
    //Connect to the database
    await sequelize.sync();
    sequelize.authenticate().then(() => {
      console.log('Connected To Database');
    });

    //Start the server
    const PORT = Config.server.port;
    app.listen(PORT, () => {
      console.clear();
      console.log(`Server is running on port ${PORT}`);
    });
  }catch (e) {
    console.log(e);
    process.exit(1);
  }
}

start();