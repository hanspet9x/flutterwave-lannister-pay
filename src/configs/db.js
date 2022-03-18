const mongoose = require('mongoose');
const {AppConfigs} = require('./app');
exports.connectDB = async () => {
  return mongoose.connect(
    AppConfigs.IS_DEV ? AppConfigs.DATABASE_URL : AppConfigs.DATABASE_URL_PROD,
  );
};
