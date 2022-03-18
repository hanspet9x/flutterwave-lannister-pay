const FCSService = require('./FcsService');

require('./../../__test__/teardown');

describe('FcsService', () => {
  test('Add fee configuration returns {status: ok}', async ()=> {
    const payload = {
      'FeeConfigurationSpec': 'LNPY1221 NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55',
    };
    const data = await FCSService.addFee(payload);
    expect(data).toEqual({status: 'ok'})
  });

  test('Add one fee spec returns {status: ok}', async () => {
    const payload = {
        'FeeConfigurationSpec': 'LNPY1221 NGN * *(*) : APPLY PERC 1.4'
    };
      const data = await FCSService.addFee(payload);
      expect(data).toEqual({status: 'ok'})
    });

    test('Add an incomplete fee spec returns 400', async () => {
        const payload = {
            'FeeConfigurationSpec': 'LNPY1221 NGN * *(*) : APPLY PERC'
        };
          FCSService.addFee(payload).catch(e => expect(e.status).toBe(400))
        });
});
