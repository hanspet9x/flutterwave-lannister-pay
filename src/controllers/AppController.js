const express = require('express');
const {AppRoutes} = require('../routes/routes');
const FCSController = require('./fcs/FCScontroller');

const AppController = express.Router();

AppController.use(AppRoutes.FCS, FCSController);

module.exports = AppController;
