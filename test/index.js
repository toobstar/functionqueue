var should = require('chai').should();

var FunctionQueue = require('../index');
var fnQ = new FunctionQueue(3, 7);

var someFunction = function(str) {
    console.log('a test function with param ' + str);
}

describe('#scheduleFn', function() {
  it('schedules a function', function(done) {
      this.timeout(20000); // allow 20s to complete (override default 2s timeout)

      fnQ.scheduleFn(someFunction, ["param1"]);
      fnQ.scheduleFn(someFunction, ["param2"]);
      fnQ.scheduleFn(someFunction, ["param3"]);
      fnQ.scheduleFn(someFunction, ["param4"]);
      fnQ.scheduleFn(someFunction, ["param5"]);
      console.log("setup done");

      fnQ.queueSize().should.be.above(4);
      console.log("queueSize good");

      setTimeout(function() {
          if (fnQ.queueSize() == 0) {
              done();
          }
      }, 15000); // after 15s check queue is zero length

  });
});




