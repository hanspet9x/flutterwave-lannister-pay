const {model} = require('mongoose');
const {FcsSchema} = require('../schema/fcs.schema');

exports.FcsModel = model('fcs', FcsSchema);
