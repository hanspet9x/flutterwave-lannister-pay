const request = require('supertest');
const App = require('./app');
const { feeSpecs, transactionData3 } = require('./__test__/test_data');
require('./__test__/teardown');

describe('App route', () => {
    test('add Fees', (done) => {
        request(App)
        .post('/v1/api/fcs/fees')
        .send(feeSpecs)
        .expect(200)
        .then(data => {
            expect(data.body).toEqual({status: 'ok'});
            done();
        })
    })

    test('Transaction request with USD failed', (done) => {
        request(App)
        .post('/v1/api/fcs/compute-transaction-fee')
        .send(transactionData3)
        .expect(400)
        .then(error => {
            expect(error.body).toEqual({
                "Error": "No fee configuration for USD transactions."
              });
            done();
        })
    })
})