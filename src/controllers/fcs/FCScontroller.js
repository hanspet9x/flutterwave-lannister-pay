const express = require('express');
const {AppRoutes} = require('../../routes/routes');
const {schemaValidationMDW} = require('../../middlewares/schemaValidation');
const {FcsSchema} = require('./schema/fcs.schema');
const FCSService = require('../../services/fcs/FcsService');
const ResponseService = require('../../services/response/ResponseService');
const {filterTransactionCurrency} = require('./middleware/fcs.mdw');
const FCSController = express.Router();

FCSController.use(AppRoutes.ADD_FEES,
    schemaValidationMDW(FcsSchema.addFee),
    async (req, res) => {
      try {
        const data = await FCSService.addFee(req.body);
        ResponseService.json(res, data, 200);
      } catch (error) {
        ResponseService.sendError(res, error);
      }
    });

FCSController.use(AppRoutes.COMPUTE_FEES,
    schemaValidationMDW(FcsSchema.transaction),
    filterTransactionCurrency('NGN'),
    async (req, res) => {
      try {
        const data = await FCSService.computeNGN(req.body);
        ResponseService.json(res, data, 200);
      } catch (error) {
        ResponseService.sendError(res, error);
      }
    },
);
module.exports = FCSController;
