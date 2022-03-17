const dotenv = require('dotenv');
dotenv.config();

exports.getEnv = (name, defaultValue = '') => {
  return process.env[name] || defaultValue;
};
