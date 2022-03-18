const ResponseError = require('../services/response/ResponseError');
const ResponseService = require('../services/response/ResponseService');

exports.schemaValidationMDW = (schema) =>
  (req, res, next) => {
    const {error} = schema.validate(req.body);
    if (error) {
      ResponseService.sendError(res,
          ResponseError.get({message: error.details[0].message}, 400));
      return;
    }
    next();
    return;
  };

