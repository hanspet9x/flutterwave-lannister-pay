// const ResponseError = require('../../response/ResponseError');
// Todo: write test
class FcsComputeRequestDTO {
  static get(transactionPayload) {
    return {
      locale: FcsComputeRequestDTO.getLocale(transactionPayload),
      entity: transactionPayload.PaymentEntity.Type,
      entityProperty: FcsComputeRequestDTO.
          getEntityProperty(transactionPayload),
    };
  }

  static getLocale(data) {
    return data.CurrencyCountry == data.PaymentEntity.Country ? 'LOCL':'INTL';
  }
  static getEntityProperty(data) {
    const payProp = data.PaymentEntity;
    const props = [];
    payProp.ID && props.push(payProp.ID);
    payProp.Brand && props.push(payProp.Brand);
    payProp.Issuer && props.push(payProp.Issuer);
    payProp.Number && props.push(payProp.Number);
    payProp.SixID && props.push(payProp.SixID);
    return props;
  /*     switch (data.PaymentEntity.Type) {
      case 'CREDIT-CARD':
      case 'DEBIT-CARD':
        return data.PaymentEntity.Brand || data.PaymentEntity.Issuer;
      case 'BANK-ACCOUNT':
        return data.PaymentEntity.Number;
      case 'USSD':
        return data.PaymentEntity.Issuer;
      case 'WALLET-ID':
        return data.PaymentEntity.SixID;
      default:
        throw ResponseError.get({message: 'invalid Entity'}, 400);
    } */
  }
}

module.exports = FcsComputeRequestDTO;
