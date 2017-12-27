const _ = require('lodash');

module.exports = {
  getCurrentRates: (req, res) => {
    const currency = _.get(req, 'query.currency', null);

    return RatesService.getExchangeRates()
      .then(rates => {
        if (_.isNull(currency)) {
          return res.send(rates);
        }
          
        return res.send({ [currency]: rates[currency] });
      })
      .catch(err => res.serverError(err));
  }
}
