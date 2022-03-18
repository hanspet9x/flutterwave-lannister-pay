const ResponseError = require('../../response/ResponseError');

exports.FcsRequestDTO = {
  // LNPY1221 NGN LOCL CREDIT-CARD(*) : APPLY PERC 1.4
  getFcsModel(props) {
    // check that props contain 7 items
    if (props.length !== 8) {
      throw ResponseError.get(
          {message: 'invalid Fee spec props'},
          400,
      );
    };
    const index = props[3].indexOf('(');
    return {
      id: props[0],
      currency: props[1],
      locale: props[2],
      entity: props[3].substring(0, index),
      entityProperty: props[3].substring(index+1).replace(')', ''),
      type: props[6],
      value: props[7],
    };
  },
};
