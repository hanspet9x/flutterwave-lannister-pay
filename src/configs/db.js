const mongoose = require('mongoose');
const NodeCache = require('node-cache');
const {AppConfigs} = require('./app');

exports.cache = new NodeCache({stdTTL: AppConfigs.CACHE_TTL});
exports.connectDB = async () => {
  return mongoose.connect(
    AppConfigs.IS_DEV ? AppConfigs.DATABASE_URL : AppConfigs.DATABASE_URL_PROD,
  );
};
