const request = require('supertest');

describe('RatesController', () => {

  describe('getCurrentRates method', () => {
    let sandbox;
    let rates;
    let ratesServiceStub;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      rates = {
        USD: 1,
        SGD: 1.34151
      };
      ratesServiceStub = sandbox.stub(RatesService, 'getExchangeRates');
      ratesServiceStub.resolves(rates);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should respond with all exchange rates', () => {
      return request(sails.hooks.http.app)
        .get('/current_rates')
        .expect(200)
        .then(response => {
          const keys = Object.keys(response.body);
          expect(keys.length).to.be.at.least(1);
          expect(response.body).to.be.deep.equal(rates);
        });
    });

    it('should respond with a specific exchange rate', () => {
      return request(sails.hooks.http.app)
        .get('/current_rates?currency=SGD')
        .expect(200)
        .then(response => {
          expect(response.body['SGD']).to.exist;
          expect(response.body['SGD']).to.be.a('number');
          expect(Object.keys(response.body)).to.have.lengthOf(1);
        });
    });
  });
});
