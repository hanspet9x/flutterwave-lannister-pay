const ResponseError = require('../../response/ResponseError');

exports.FcsRequestDTO = {
  // LNPY1221 NGN LOCL CREDIT-CARD(*) : APPLY PERC 1.4
  fees(props) {
    // check that props contain 7 items
    if (props.length === 7) {
      throw ResponseError.get(
          {message: 'invalid Fee spec props'},
      );
    };
    return {
      id: props[0],
      currency: props[1],
      locale: props[2] == 'LOCL',
      entity: props[3],
      entityProperty: props[4],
      type: props[5],
      value: props[6],
    };
  },
};
