exports.FcsComputeResponseDTO = {
  getFees(id, fees) {
    return {
      AppliedFeeID: id,
      AppliedFeeValue: fees.appliedFee,
      ChargeAmount: fees.chargeAmount,
      SettlementAmount: fees.settlementAmount,
    };
  },

  feeData(raw, queryResult) {
    return {
      type: queryResult.type,
      value: queryResult.value,
      bearsFee: raw.Customer.BearsFee,
    };
  },
};
