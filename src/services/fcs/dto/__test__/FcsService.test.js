const FCSRepository = require('../../../../repo/FCSRepository');
const { transactionData1, queryResult, transactionData2 } = require('../../../../__test__/test_data');
const FCSService = require('../../FcsService');

require('../../../../__test__/teardown');

describe('Add FCS', () => {
  test('Add fee configuration returns {status: ok}', async () => {
    const payload = {
      'FeeConfigurationSpec': 'LNPY1221 NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55',
    };
    const data = await FCSService.addFee(payload);
    expect(data).toEqual({ status: 'ok' })
  });

  test('Add one fee spec returns {status: ok}', async () => {
    const payload = {
      'FeeConfigurationSpec': 'LNPY1221 NGN * *(*) : APPLY PERC 1.4'
    };
    const data = await FCSService.addFee(payload);
    expect(data).toEqual({ status: 'ok' })
  });

  test('Add an incomplete fee spec returns 400', async () => {
    const payload = {
      'FeeConfigurationSpec': 'LNPY1221 NGN * *(*) : APPLY PERC'
    };
    FCSService.addFee(payload).catch(e => expect(e.status).toBe(400))
  });
});

describe('Compute Transaction with FCS', () => {
  const amount = 1000;
  const feeDataDTO = {
    type: 'PERC',
    value: '1.4',
    bearsFee: true,
  }

  test('calculate 1.4 PERC appliedFee of 1000 amount', () => {
    const value = '1.4';
    const data = FCSService.getAppliedFee(amount, { value, type: 'PERC' });
    expect(data).toBe((1.4 / 100) * amount)
  })

  test('calculate 20:1.4 FLAT_PERC appliedFee of 1000 amount', () => {
    const value = '20:1.4';
    const data = FCSService.getAppliedFee(amount, { value, type: 'FLAT_PERC' });
    expect(data).toBe(Math.round(((1.4 / 100) * amount) + 20))
  });

  test('Get all Fees on PERC 1.4 transaction with 1000 amount and bearsFee true', () => {
    const res = FCSService.getFees(amount, feeDataDTO);
    const appliedFee = Math.round((1.4 / 100) * amount);
    expect(res).toEqual({
      appliedFee,
      chargeAmount: appliedFee + amount,
      settlementAmount: (appliedFee + amount) - appliedFee,
    })
  });

  test('Get all Fees on PERC 1.4 transaction with 1000 amount and bearsFee false', () => {
    feeDataDTO.bearsFee = false
    const res = FCSService.getFees(amount, feeDataDTO);
    const appliedFee = Math.round((1.4 / 100) * amount);
    expect(res).toEqual({
      appliedFee,
      chargeAmount: amount,
      settlementAmount: amount - appliedFee,
    })
  });
})

describe('Weighted Value', () => {
  const query = {
    locale: 'LOCL',
    entity: 'CREDIT-CARD',
    entityProperty: 'MASTERCARD'
  }

  test('matched query and result locale has weighed value = 2', () => {
    const result = query
    const res = FCSService.getWeight('locale', result, query);
    expect(res).toBe(2);
  })

  test('query and result locale value LOCL and * has weighed value = 1', () => {
    const result = { ...query }
    result.locale = '*';
    const res = FCSService.getWeight('locale', result, query);
    expect(res).toBe(1);
  })

  test('unMatched query and result locale value LOCL and INTL has weighed value = -1', () => {
    const result = { ...query }
    result.locale = 'INTL';
    const res = FCSService.getWeight('locale', result, query);
    expect(res).toBe(-1);
  })

  test('Matched query and result has weighed value = 6', () => {
    const result = query
    const res = FCSService.getTotalPropsWeight(result, query);
    expect(res).toBe(6);
  })


  test('Glob matched query and result has weighed value = 4', () => {
    const result = { ...query }
    result.locale = '*';
    result.entityProperty = '*';
    const res = FCSService.getTotalPropsWeight(result, query);
    expect(res).toBe(4);
  })

  test('Barely matched query and result has weighed value = 2', () => {
    const result = { ...query }
    result.locale = 'INTL';
    result.entityProperty = '*';
    const res = FCSService.getTotalPropsWeight(result, query);
    expect(res).toBe(2);
  })

  test('return LNPY1221 for LOCL, USSD, AIRTEL ', async () => {
    const results = await FCSRepository.getNGNFees(queryResult[0]);
    const res = FCSService.getPrecedence(results, query);
    expect(res.id).toBe('LNPY1223');
  });

  test('return LNPY1221 for LOCL, USSD, AIRTEL ', async () => {
    const results = await FCSRepository.getNGNFees(queryResult[1]);
    const res = FCSService.getPrecedence(results, query);
    expect(res.id).toBe('LNPY1221');
  });

  test('Test computation 1', async () => {
    const result = await FCSService.computeNGN(transactionData1);
    expect(result).toEqual({
      "AppliedFeeID": "LNPY1223",
      "AppliedFeeValue": 120,
      "ChargeAmount": 5120,
      "SettlementAmount": 5000
    })
  });

  test('Test computation 2', async () => {
    const result = await FCSService.computeNGN(transactionData2);
    expect(result).toEqual({
      "AppliedFeeID": "LNPY1221",
      "AppliedFeeValue": 49,
      "ChargeAmount": 3500,
      "SettlementAmount": 3451
  })
  });
})
