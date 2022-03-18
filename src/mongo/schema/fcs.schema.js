const {Schema} = require('mongoose');

exports.FcsSchema = new Schema({
  id: String,
  currency: String,
  locale: String,
  entity: String,
  // entity: {type: String,
  //   enum: ['CREDIT-CARD', 'DEBIT-CARD', 'BANK-ACCOUNT',
  //     'USSD', 'WALLET-ID', '*']},
  entityProperty: String,
  type: String,
  // type: {type: String, enum: ['PERC', 'FLAT_PERC', 'FLAT', '*']},
  value: String,
});

