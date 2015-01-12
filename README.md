FunctionQueue
=========

A small library providing utility methods to queue and rate limit JavaScript functions.

## Installation

  npm install functionqueue

## Usage

  var FunctionQueue = require('FunctionQueue');

  // max 3 calls per 7 seconds
  var fnQ = new FunctionQueue(3, 7);

  fnQ.scheduleFn(someFunction, ["param1"]);

## Tests

  npm test


## Release History

* 0.0.2 Initial release
