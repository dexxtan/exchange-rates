const RatesService = require('../../api/services/RatesService');
const cache = require('memory-cache');

describe('RatesService', () => {

  describe('getExchangeRates method', () => {
    let sandbox;
    let rates;
    let cacheServicePutStub;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      rates = {
        USD: 1,
        SGD: 1.34151
      };
      cacheServicePutStub = sandbox.stub(CacheService, 'put');
      cacheServicePutStub.callThrough();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should call CacheService.put and resolve with the exchange rates', () => {
      return RatesService.getExchangeRates()
        .then(rates => {
          expect(cacheServicePutStub).to.have.been.calledOnce;
          const keys = Object.keys(rates);
          keys.map(key => {
            expect(key).to.be.a('string');
            expect(key).to.have.lengthOf(3);
            expect(rates[key]).to.be.a('number');
            expect(rates[key]).to.be.finite;
          });
        });
    });

    it('should just return exchange rates when already cached', () => {
      cache.put('rates', rates);
      return RatesService.getExchangeRates()
        .then(rates => {
          expect(cacheServicePutStub).to.not.have.been.called;
          expect(rates).to.be.equal(rates);
        });
    }); 
  });
});
