const cache = require('memory-cache');
const Promise = require('bluebird');

module.exports = {
  put: (key, object, expiry = 60 * 60 * 1000) => {
    return Promise.try(() => cache.put(key, object, expiry));
  },

  get: (key) => {
    return Promise.try(() => cache.get(key));
  }
};
