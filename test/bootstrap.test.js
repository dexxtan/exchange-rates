const sails = require('sails');
const Promise = require('bluebird');
const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

global.expect = chai.expect;
global.sinon = require('sinon');

before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(5000);

  sails.lift({
    // configuration for testing purposes
    connections: {
      testDB: {
        adapter: 'sails-memory'
      }
    },
    hooks: {
      grunt: false
    },
    models: {
      connection: 'testDB'
    }
  }, function(err) {
    if (err) return done(err);
    // here you can load fixtures, etc.
    done(err, sails);
  });
});

after(function(done) {
  // here you can clear fixtures, etc.
  sails.lower(done);
});
