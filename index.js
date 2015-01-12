
var FunctionQueue = function(maxCallsPerPeriod, periodLengthSeconds) {
    this.maxCallsPerPeriod = maxCallsPerPeriod;
    this.periodLengthSeconds = periodLengthSeconds;
    this.callsThisPeriod = 0;
    this.totalCalls = 0;
    this.secondsThisPeriod = 0;
    this.fnQueue = [];
    this.started = false;
    this.interval = 1000;
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
        //console.log('queueSize',self.fnQueue.length);
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
            //console.log('running secondsThisPeriod ' + self.secondsThisPeriod + ' callsThisPeriod ' + self.callsThisPeriod + ' maxCallsPerPeriod ' + self.maxCallsPerPeriod + ' totalCalls ' + self.totalCalls);
            if (self.fnQueue.length > 0) {
                if (self.callsThisPeriod < self.maxCallsPerPeriod) {
                    self.callsThisPeriod++;
                    self.totalCalls++;
                    (self.fnQueue.shift())();
                }
            }
        }, self.interval);
    }
};

module.exports = FunctionQueue;



