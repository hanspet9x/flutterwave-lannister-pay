const Joi = require('joi');

exports.FcsSchema = {
  addFee: Joi.object({
    FeeConfigurationSpec: Joi.string().required(),
  }),
  transaction: Joi.object({
    'ID': Joi.number().required(),
    'Amount': Joi.number().required(),
    'Currency': Joi.string().required(),
    'CurrencyCountry': Joi.string().required(),
    'Customer': Joi.object({
      'ID': Joi.number().required(),
      'EmailAddress': Joi.string().required(),
      'FullName': Joi.string().required(),
      'BearsFee': Joi.boolean().required(),
    }),
    'PaymentEntity': Joi.object({
      'ID': Joi.number().required(),
      'Issuer': Joi.string().required(),
      'Brand': Joi.string().valid(''),
      'Number': Joi.string().required().length(16),
      'SixID': Joi.string().required().max(6).min(6),
      'Type': Joi.string().required(),
      'Country': Joi.string().required(),
    }),
  },
  ),
};

