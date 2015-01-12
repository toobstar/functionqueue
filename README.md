FunctionQueue
=========

A small library providing utility methods to queue and rate limit JavaScript functions.

## Installation

  npm install functionqueue

## Usage

  var FunctionQueue = require('functionqueue');

  // max 3 calls per 7 seconds
  var fnQ = new FunctionQueue(3, 7);

  fnQ.scheduleFn(someFunction, ["param1"]);

  Complete constructor args:
    maxCallsPerPeriod
    periodLengthSeconds (period over which max calls checked - default 60s)
    maxFrequency (call no more than every X seconds - default 5s)
    queueName (enables debug logging)


## Tests

  npm test


## Release History

* 0.0.8 Initial release
