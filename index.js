
var FunctionQueue = function(maxCallsPerPeriod, periodLengthSeconds, maxFrequency) {
    console.log("creating FunctionQueue instance with params ", maxCallsPerPeriod, periodLengthSeconds, maxFrequency);
    this.maxCallsPerPeriod = maxCallsPerPeriod;
    if (periodLengthSeconds) {
        this.periodLengthSeconds = periodLengthSeconds;
    }
    else {
        this.periodLengthSeconds = 60;
    }
    this.callsThisPeriod = 0;
    this.totalCalls = 0;
    this.secondsThisPeriod = 0;
    this.fnQueue = [];
    this.started = false;
    if (maxFrequency) {
        this.maxFrequency = maxFrequency;
    }
    else {
        this.maxFrequency = 5; // run no more than once every 5s
    }
    this.earliestNextCall = this.periodLengthSeconds;
};

FunctionQueue.prototype = {
    maxCallsPerPeriod: 0,

    scheduleFn: function(callbackFn, callbackArgs) {
        var self = this;
        self.fnQueue.push(self.prepFn(callbackFn, self, callbackArgs));
        if (self.started == false) {
            self.started = true;
            self.run();
        }
    },

    prepFn: function(fn, context, params) {
        return function() {
            fn.apply(context, params); // trigger call of named function "fn"
        };
    },

    queueSize: function() {
        var self = this;
        console.log('queueSize',self.fnQueue.length);
        return self.fnQueue.length;
    },

    run: function() {
        var self = this;
        console.log('run');
        setInterval(function() {
            self.secondsThisPeriod++;
            if (self.secondsThisPeriod > (self.periodLengthSeconds-1)) {
                self.secondsThisPeriod = 0;
                self.callsThisPeriod = 0;
            }
            console.log('running -- secondsThisPeriod ' + self.secondsThisPeriod + ' callsThisPeriod ' + self.callsThisPeriod);
            console.log('running -- maxCallsPerPeriod ' + self.maxCallsPerPeriod + ' totalCalls ' + self.totalCalls);
            console.log('running -- earliestNextCall ' + self.earliestNextCall + ' periodLengthSeconds ' + self.periodLengthSeconds);
            console.log('running -- queue: ' + self.fnQueue.length);
            console.log('---------------- ');
            if (self.fnQueue.length > 0) {
                if (self.callsThisPeriod < self.maxCallsPerPeriod && self.secondsThisPeriod < self.earliestNextCall) {
                    self.callsThisPeriod++;
                    self.totalCalls++;
                    self.earliestNextCall = self.secondsThisPeriod + self.maxFrequency;
                    (self.fnQueue.shift())();
                }
            }
        }, 1000); // run every second
    }
};

module.exports = FunctionQueue;



