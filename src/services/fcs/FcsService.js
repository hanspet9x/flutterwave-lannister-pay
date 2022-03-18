const FCSRepository = require('../../repo/FCSRepository');
const {FcsRequestDTO} = require('./dto/FcsRequestDTO');
const {LogService} = require('./../log/LogService');
const ResponseError = require('../response/ResponseError');
const FcsComputeDTO = require('./dto/FcsComputeRequestDTO');
const {FcsComputeResponseDTO} = require('./dto/FcsComputeResponseDTO');

class FCSService {
  static async addFee(request) {
    try {
      // split the fee spec with new line
      const specs = request.FeeConfigurationSpec.split('\n');
      if (specs.length) {
        // convert specs to array of schema structure
        const data = specs.map( (spec) =>
          FcsRequestDTO.getFcsModel(spec.split(' ')));
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

  static async computeNGN(data) {
    try {
      const query = FcsComputeDTO.get(data);
      const results = await FCSRepository.getNGNFees(query);
      let precedence;
      if (results.length) {
        if (results.length > 1) {
          precedence = FCSService.getPrecedence(results, query);
        } else {
          precedence = results[0];
        }
        return FcsComputeResponseDTO.getFees(precedence.id,
            FCSService.getFees(data.Amount,
                FcsComputeResponseDTO.feeData(data, precedence)));
      }
      throw ResponseError.get({
        message: 'We cannot process your transaction now',
      }, 400);
    } catch (error) {

    }
  }
  // locale, entity, entityProperty
  static getPrecedence(queryResults = [], query) {
    const results = queryResults.map((result) => {
      // use locale, entity and entityProp to weigh result
      const weight = FCSService.getTotalPropsWeight(result, query);
      return {result, weight};
    });
    results.sort((a, b) => b.weight - a.weight);
    return results[0].result;
  }

  static getTotalPropsWeight(result, query) {
    const props = ['locale', 'entity', 'entityProperty'];
    return props.reduce((sum, prop)=> {
      return sum + FCSService.getWeight(prop, result, query);
    }, 0);
  }

  static getWeight(prop, result, query) {
    if (result[prop] == query[prop]) {
      return 2;
    } else if (result[prop] == '*') {
      return 1;
    } else {
      return -1;
    }
  }

  static getFees(amount, feeDataDTO) {
    const appliedFee = Math.round(
        FCSService.getAppliedFee(amount, feeDataDTO),
    );
    const chargeAmount = FCSService
        .getChargeAmount(amount, appliedFee, feeDataDTO);
    return {
      appliedFee,
      chargeAmount,
      settlementAmount: chargeAmount - appliedFee,
    };
  }

  static getChargeAmount(amount, appliedFee, data) {
    return data.bearsFee ? appliedFee + amount : amount;
  }

  static getAppliedFee(amount, data) {
    const value = data.value;
    switch (data.type) {
      case 'FLAT_PERC':
        const splitted = value.split(':');
        const perc = (parseFloat(splitted[1]) / 100) * amount;
        return (perc + parseInt(splitted[0]));
      case 'PERC':
        return (parseFloat(value) / 100) * amount;
      default:
        return parseFloat(value);
    }
  }
}

module.exports = FCSService;
