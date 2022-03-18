const testData = require("../../../../__test__/test_data");
const FcsComputeRequestDTO = require("../FcsComputeRequestDTO");

describe('FcsComputeRequestDTO', () => {

    test('local entity CREDIT-CARD property is Mastercard', () => {
        const res = FcsComputeRequestDTO.get(testData.transactionData1);
        expect(res).toEqual({
            locale: 'LOCL',
            entity: 'CREDIT-CARD',
            entityProperty: 'MASTERCARD'
        })
    });   
});