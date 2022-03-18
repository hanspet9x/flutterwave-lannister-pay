const ResponseError = require('../../../services/response/ResponseError');
const ResponseService = require('../../../services/response/ResponseService');

exports.filterTransactionCurrency = (currency) =>
  (req, res, next) => {
    const nCur = req.body.Currency;
    if (nCur == currency) {
      next();
      return;
    }
    ResponseService.sendError(res, ResponseError.get({
      message: `No fee configuration for ${nCur} transactions.`,
    }, 400));
    return;
  };
