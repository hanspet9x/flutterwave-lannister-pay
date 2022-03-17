const ResponseError = require('../services/response/ResponseError');
const ResponseService = require('../services/response/ResponseService');

exports.schemaValidationMDW = (schema, type) =>
  (req, res, next) => {
    let reqData;
    type = type || 'body';
    switch (type) {
      case 'body':
        reqData = req.body;
        break;
      case 'params':
        reqData = req.params;
        break;
      default:
        reqData = req.query;
        break;
    }
    const {error} = schema.validate(reqData);
    if (error) {
      ResponseService.sendError(res,
          ResponseError.get(error.details[0].message, 400));
      return;
    }
    req.body = reqData;
    next();
    return;
  };

