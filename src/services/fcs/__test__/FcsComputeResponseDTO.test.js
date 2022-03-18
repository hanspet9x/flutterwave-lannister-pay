const { transactionData1 } = require("../../../__test__/test_data");
const { FcsComputeResponseDTO } = require("./../dto/FcsComputeResponseDTO");

describe('FcsComputeRequestDTO', () => {

    test('get all fees and Id returns expected result', () => {
        const id = 'GHJEL';
        const fees = {
            appliedFee: 10,
            chargeAmount: 12,
            settlementAmount: 22
        };
        const res = FcsComputeResponseDTO.getFees(id, fees);
        expect(res).toEqual({
            AppliedFeeID: id,
            AppliedFeeValue: fees.appliedFee,
            ChargeAmount: fees.chargeAmount,
            SettlementAmount: fees.settlementAmount,
        })
    });


    test('Get data to calculate fees returns the expected', () => {
        const queryResult = {type: 'PERC', value: '1.4'}
        const res = FcsComputeResponseDTO.feeData(transactionData1,queryResult );
        expect(res).toEqual({
            type: queryResult.type,
            value: queryResult.value,
            bearsFee: transactionData1.Customer.BearsFee,
          })
    })
});