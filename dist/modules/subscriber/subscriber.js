"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RedisSubscriber = /** @class */ (function () {
    function RedisSubscriber(_a) {
        var redisSubscriber = _a.redisSubscriber, logger = _a.logger;
        this.subscriber = redisSubscriber;
        this.logger = logger;
        this.subscriber.on('message', this.handleMessage.bind(this));
        this.subscriptionMap = {};
        this.subsRefsMap = {};
        this.currentSubscriptionId = 0;
    }
    RedisSubscriber.prototype.subscribe = function (trigger, onMessage) {
        var _this = this;
        this.log('debug', "Received a redis subscription request for " + trigger + ". Subscribing...");
        var triggerName = trigger;
        var id = this.currentSubscriptionId++;
        this.subscriptionMap[id] = [triggerName, onMessage];
        var refs = this.subsRefsMap[triggerName];
        if (refs && refs.length > 0) {
            var newRefs = refs.concat([id]);
            this.subsRefsMap[triggerName] = newRefs;
            return Promise.resolve(id);
        }
        else {
            return new Promise(function (resolve, reject) {
                // TODO Support for pattern subs
                _this.subscriber.subscribe(triggerName, function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        _this.subsRefsMap[triggerName] = (_this.subsRefsMap[triggerName] || []).concat([id]);
                        resolve(id);
                    }
                });
            });
        }
    };
    RedisSubscriber.prototype.unsubscribe = function (subId) {
        var _a = (this.subscriptionMap[subId] || [])[0], triggerName = _a === void 0 ? null : _a;
        this.log('debug', "Received a redis unsubscribe request for triggerName: " + triggerName + " subId: " + subId + ". Unsubscribing...");
        if (!triggerName) {
            throw new Error("There is no subscription of id \"" + subId + "\"");
        }
        var refs = this.subsRefsMap[triggerName];
        if (!refs)
            throw new Error("There is no subscription of id \"" + subId + "\"");
        if (refs.length === 1) {
            // prune
            this.subscriber.unsubscribe(triggerName);
            delete this.subsRefsMap[triggerName];
        }
        else {
            var index = refs.indexOf(subId);
            var newRefs = index === -1 ? refs : refs.slice(0, index).concat(refs.slice(index + 1));
            this.subsRefsMap[triggerName] = newRefs;
        }
        delete this.subscriptionMap[subId];
    };
    RedisSubscriber.prototype.handleMessage = function (channel, message) {
        var subscribers = this.subsRefsMap[channel];
        if (!subscribers || !subscribers.length) {
            return;
        }
        var parsedMessage;
        try {
            parsedMessage = JSON.parse(message);
        }
        catch (e) {
            parsedMessage = message;
        }
        for (var _i = 0, subscribers_1 = subscribers; _i < subscribers_1.length; _i++) {
            var subId = subscribers_1[_i];
            var _a = this.subscriptionMap[subId], listener = _a[1];
            listener(parsedMessage);
        }
    };
    RedisSubscriber.prototype.log = function (level, message, meta) {
        if (!this.logger) {
            return;
        }
        this.logger.log(level, message, meta);
    };
    return RedisSubscriber;
}());
exports.RedisSubscriber = RedisSubscriber;
//# sourceMappingURL=subscriber.js.map