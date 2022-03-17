const express = require('express');
const {AppRoutes} = require('../routes/routes');

const AppController = express.Router();

AppController.use(AppRoutes.AUTH, ()=>{});

module.exports = AppController;
