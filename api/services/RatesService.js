const _ = require('lodash');
const requestPromise = require('request-promise');

module.exports = {
  getExchangeRates: () => {
    const appId = sails.config.globals.OPEN_EXCHANGE_RATES_APP_ID;

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
