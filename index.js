
var FunctionQueue = function(maxCallsPerPeriod, periodLengthSeconds, maxFrequency, queueName) {
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
    this.earliestNextCall = 0;

    console.log("creating FunctionQueue instance with params maxCallsPerPeriod " + maxCallsPerPeriod + " periodLengthSeconds " + periodLengthSeconds + " maxFrequency " + maxFrequency);
    if (queueName) {
        console.log(" and queueName " + queueName);
        this.queueName = queueName;
    }

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
        if (self.queueName) {
            console.log(self.queueName + ' queueSize',self.fnQueue.length);
        }
        return self.fnQueue.length;
    },

    run: function() {
        var self = this;
        if (self.queueName) {
            console.log('run');
        }
        setInterval(function() {
            self.secondsThisPeriod++;
            if (self.secondsThisPeriod > (self.periodLengthSeconds-1)) {
                self.secondsThisPeriod = 0;
                self.callsThisPeriod = 0;
                self.earliestNextCall = self.earliestNextCall - self.periodLengthSeconds;
            }
            if (self.queueName) {
                console.log(self.queueName + ' ---------------- ');
                console.log(self.queueName + ' checking -- secondsThisPeriod ' + self.secondsThisPeriod + ' callsThisPeriod ' + self.callsThisPeriod);
                console.log(self.queueName + ' checking -- maxCallsPerPeriod ' + self.maxCallsPerPeriod + ' totalCalls ' + self.totalCalls);
                console.log(self.queueName + ' checking -- earliestNextCall ' + self.earliestNextCall + ' periodLengthSeconds ' + self.periodLengthSeconds);
                console.log(self.queueName + ' checking -- queue: ' + self.fnQueue.length);
            }
            if (self.fnQueue.length > 0) {
                if (self.callsThisPeriod < self.maxCallsPerPeriod && self.secondsThisPeriod > self.earliestNextCall) {
                    self.callsThisPeriod++;
                    self.totalCalls++;
                    self.earliestNextCall = self.secondsThisPeriod + self.maxFrequency;
                    if (self.queueName) {
                        console.log(self.queueName + ' running -- queue: ' + self.fnQueue.length);
                    }
                    (self.fnQueue.shift())();
                }
            }
        }, 1000); // run every second
    }
};

module.exports = FunctionQueue;



