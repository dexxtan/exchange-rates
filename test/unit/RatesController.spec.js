const httpMocks = require('node-mocks-http');
const RatesController = require('../../api/controllers/RatesController');

describe('RatesController', () => {
  let sandbox;
  let request;
  let response;
  let rates;
  let ratesServiceStub;
  let responseSendSpy;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    request = httpMocks.createRequest({ method: 'GET' });
    response = httpMocks.createResponse();
    rates = {
      USD: 1,
      SGD: 1.34151
    };
    responseSendSpy = sandbox.spy(response, 'send');
    ratesServiceStub = sandbox.stub(RatesService, 'getExchangeRates');
    ratesServiceStub.resolves(rates);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getCurrentRates method', () => {
    it('should call RatesService.getExchangeRates()', () => {
      return RatesController.getCurrentRates(request, response)
        .then(() => {
          expect(ratesServiceStub).to.have.been.calledOnce;
          expect(ratesServiceStub).to.have.been.calledWith();
        });
    });

    it('should call response.send with all exchange rates by default', () => {
      return RatesController.getCurrentRates(request, response)
        .then(() => {
          expect(responseSendSpy).to.have.been.calledOnce;
          expect(responseSendSpy).to.have.been.calledWith(rates);
        });
    });

    it('should call response.send with a specified currency rate when provided', () => {
      request.query.currency = 'SGD';
      return RatesController.getCurrentRates(request, response)
        .then(() => {
          expect(responseSendSpy).to.have.been.calledOnce;
          expect(responseSendSpy).to.have.been.calledWith(sinon.match.has('SGD', rates['SGD']));
          expect(responseSendSpy).to.not.have.been.calledWith(sinon.match.has('USD'));
        });
    });
  });
});
