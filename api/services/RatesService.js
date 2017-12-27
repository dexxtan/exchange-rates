const _ = require('lodash');
const requestPromise = require('request-promise');

module.exports = {
  getExchangeRates: () => {
    const appId = '91b8dd663ae6472283a0a418fc8d6ac3';

    return CacheService.get('rates')
      .then((exchangeRates) => {
        if (_.isNull(exchangeRates)) {
          return requestPromise(`https://openexchangerates.org/api/latest.json?app_id=${appId}`)
            .then(response => {
              const parsedResponse = JSON.parse(response);
              const rates = _.get(parsedResponse, 'rates');
              CacheService.put('rates', rates);
              return rates;
            });
        }
        
        return exchangeRates;
      });
  }
};
