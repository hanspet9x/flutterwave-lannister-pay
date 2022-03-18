const {transactionData1} = require("../../../__test__/test_data");
const FcsComputeRequestDTO = require("./../dto/FcsComputeRequestDTO");

describe('FcsComputeRequestDTO', () => {

    test('local entity CREDIT-CARD property is Mastercard', () => {
        const res = FcsComputeRequestDTO.get(transactionData1);
        expect(res).toEqual({
            locale: 'LOCL',
            entity: 'CREDIT-CARD',
            entityProperty: [
                transactionData1.PaymentEntity.ID,
                transactionData1.PaymentEntity.Brand,
                transactionData1.PaymentEntity.Issuer,
                transactionData1.PaymentEntity.Number,
                transactionData1.PaymentEntity.SixID
            ]
        })
    });   
});