FunctionQueue
=========

A small library providing utility methods to queue and rate limit JavaScript functions.

## Installation

  npm install functionqueue

## Usage

  var FunctionQueue = require('functionqueue');

Complete constructor args:
1) maxCallsPerPeriod
2) periodLengthSeconds (period over which max calls checked - default 60s)
3) maxFrequency (call no more than every X seconds - default 5s)
4) queueName (enables debug logging)

  // max 3 calls per 7 seconds
  var fnQ = new FunctionQueue(3, 7);

  fnQ.scheduleFn(someFunction, ["param1"]);

Other functions:

  fnQ.queueSize();

## Tests

  npm test


## Release History

* 0.0.8 Initial release
