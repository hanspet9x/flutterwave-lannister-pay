const express = require('express');
const cors = require('cors');
const {AppConfigs} = require('./configs/app.js');
const AppController = require('./controllers/AppController.js');

const App = express();
/* init */
App.use(express.json());
App.use(express.text());
App.use(express.raw());
App.use(express.urlencoded({extended: false}));

App.use(cors({origin: AppConfigs.ORIGIN}));

/* register controllers */

App.use(AppConfigs.APP_ROUTE, AppController);

module.exports = App;

