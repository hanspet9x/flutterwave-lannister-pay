const { feeSpec } = require("../../../__test__/test_data");
const { FcsRequestDTO } = require("../dto/FcsRequestDTO");

describe('FcsRequestDTO', () => {

    test('get FCS adapted model', () => {
        const res = FcsRequestDTO.getFcsModel(feeSpec.split(' '));
        expect(res).toEqual({
            id: 'LNPY1221',
            currency: 'NGN',
            locale: 'LOCL',
            entity: 'CREDIT-CARD',
            entityProperty: 'VISA',
            type: 'PERC',
            value: '1.4',
        })
    })
});
