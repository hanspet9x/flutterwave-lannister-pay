const {FcsModel} = require('./../mongo/model/fcs.model');

/**
 * FCS Repository
 */
class FCSRepository {
  static add(data) {
    return FcsModel.create(data);
  }

  static getAll() {
    return FcsModel.find().lean();
  }

  static getNGNFees(data) {
    // currency, locale, entity, property
    return FcsModel.find({
      $and: [
        {currency: 'NGN'},
        {$or: [
          {locale: data.locale},
          {locale: '*'},
        ]},
        {$or: [
          {entity: data.entity},
          {entity: '*'},
        ]},
        {$or: [
          {property: data.property},
          {property: '*'},
        ]},
      ],
    }).lean();
  }
}

module.exports = FCSRepository;
