const {Schema} = require('mongoose');

exports.FcsSchema = new Schema({
  id: String,
  currency: String,
  locale: {type: String, enum: ['LOCL', 'INTL']},
  entity: {type: String,
    enum: ['CREDIT-CARD', 'DEBIT-CARD', 'BANK-ACCOUNT', 'USSD', 'WALLET-ID']},
  entityProperty: String,
  type: {type: String, enum: ['PERC', 'FLAT_PERC', 'FLAT']},
  value: String,
});

