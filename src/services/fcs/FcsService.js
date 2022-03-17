const FCSRepository = require('../../repo/FCSRepository');
const {FcsRequestDTO} = require('./dto/FcsRequestDTO');
const {LogService} = require('./../log/LogService');
const ResponseError = require('../response/ResponseError');

class FCSService {
  static async addFee(request) {
    try {
      // split the fee spec with new line
      const specs = request.FeeConfigurationSpec.split('\n');

      if (specs.length) {
        // convert specs to array of schema structure
        const data = specs.map( (spec) => FcsRequestDTO.fees(spec.split(' ')));
        // save data to the database
        await FCSRepository.add(data);
        // write to cache
        return {status: 'ok'};
      }
      throw ResponseError.get(
          {message: 'FeeConfigurationSpec unrecognized.'},
          400);
    } catch (error) {
      if (error instanceof ResponseError) throw error;
      LogService.error(error);
      throw ResponseError.get(error, 500);
    }
  }
}

module.exports = FCSService;
