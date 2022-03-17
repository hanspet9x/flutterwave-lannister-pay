const express = require('express');
const {AppRoutes} = require('../../routes/routes');
const {schemaValidationMDW} = require('../../middlewares/schemaValidation');
const {FcsSchema} = require('./schema');
const FCSService = require('../../services/fcs/FcsService');
const ResponseService = require('../../services/response/ResponseService');
const FCSController = express.Router();

FCSController.use(AppRoutes.ADD_FCS,
    schemaValidationMDW(FcsSchema.addFee),
    async (req, res) => {
      try {
        const data = await FCSService.addFee(req.body);
        ResponseService.json(res, data, 200);
      } catch (error) {
        ResponseService.sendError(res, error);
      }
    });

module.exports = FCSController;
