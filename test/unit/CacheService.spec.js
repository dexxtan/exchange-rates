const CacheService = require('../../api/services/CacheService');
const cache = require('memory-cache');

describe('CacheService', () => {
  
  describe('put method', () => {
    it('should save the object specified and resolve with a promise of the cached value', () => {
      const testObj = {};
      return CacheService.put('testKey', testObj)
        .then(obj => {
          expect(obj).to.be.equal(testObj)
          expect(cache.get('testKey')).to.be.equal(testObj);
        });
    });
  });

  describe('get method', () => {
    it('should resolve with a promise of the cached value', () => {
      const testObj = {};
      cache.put('testObj', testObj);
      return CacheService.get('testObj')
        .then(obj => {
          expect(obj).to.be.equal(testObj);
        });
    });
  });
});
