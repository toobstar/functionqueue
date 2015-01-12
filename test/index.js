var should = require('chai').should();

var FunctionQueue = require('../index');
var fnQ = new FunctionQueue(3, 7, 2); // maxCallsPerPeriod, periodLengthSeconds, maxFrequency

var someFunction = function(str) {
    console.log('a test function with param ' + str);
}

describe('#scheduleFn', function() {
  it('schedules a function', function(done) {
      this.timeout(15000); // allow 20s to complete (override default 2s timeout)

      fnQ.scheduleFn(someFunction, ["param1"]);
      fnQ.scheduleFn(someFunction, ["param2"]);
      fnQ.scheduleFn(someFunction, ["param3"]);
      fnQ.scheduleFn(someFunction, ["param4"]);
      fnQ.scheduleFn(someFunction, ["param5"]);
      console.log("setup done");


      // Rules:
      //    max 3 calls per 7 seconds
      //    allow 2s gap between calls

      // // 5 functions in queue

      // Timing of calls:
      //   1) 0s
      //   2) 4s
      //   3) 6s
      //   wait till 7s
      //   4) 8s
      //   5) 10s

      fnQ.queueSize().should.be.above(4);
      console.log("queueSize good");

      setTimeout(function() {
          if (fnQ.queueSize() == 0) {
              done();
          }
      }, 12000); // after 15s check queue is zero length

  });
});




