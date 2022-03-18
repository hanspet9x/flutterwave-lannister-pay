const {getEnv} = require('.');
exports.AppConfigs = {
  SERVER_PORT: getEnv('SERVER_PORT'),
  CACHE_TTL: getEnv('CACHE_TTL'),
  ORIGIN: getEnv('CORS_ALLOWED_ORIGINS'),
  APP_ROUTE: getEnv('APP_ROUTE'),
  DATABASE_URL: getEnv('DATABASE_URL'),
  DATABASE_URL_TEST: getEnv('DATABASE_URL_TEST'),
  DATABASE_URL_PROD: getEnv('DATABASE_URL_PROD'),
  NODE_ENV: getEnv('NODE_ENV'),
  IS_DEV: getEnv('NODE_ENV') === 'development',
};
