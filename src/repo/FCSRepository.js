const {FcsModel} = require('./../mongo/model/fcs.model');

/**
 * FCS Repository
 */
class FCSRepository {
  static add(data) {
    return FcsModel.create(data);
  }

  static get() {
    return FcsModel.find().lean();
  }
}
module.exports = FCSRepository;
