const request = require('supertest');

describe('RatesController', () => {

  describe('getCurrentRates method', () => {
    it('should respond with all exchange rates', () => {
      return request(sails.hooks.http.app)
        .get('/current_rates')
        .expect(200)
        .then(response => {
          const keys = Object.keys(response.body);
          keys.map(key => {
            expect(key).to.be.a('string');
            expect(key).to.have.lengthOf(3);
            expect(response.body[key]).to.be.a('number');
            expect(response.body[key]).to.be.finite;
          });
          expect(keys.length).to.be.at.least(1);
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
