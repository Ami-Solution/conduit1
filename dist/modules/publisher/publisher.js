"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RedisPublisher = /** @class */ (function () {
    function RedisPublisher(_a) {
        var redisPublisher = _a.redisPublisher, logger = _a.logger;
        this.publisher = redisPublisher;
        this.logger = logger;
    }
    RedisPublisher.prototype.publish = function (channelName, payload) {
        var _this = this;
        return new Promise(function (accept, reject) {
            _this.log('verbose', "Publishing event to " + channelName + " channel", payload);
            return _this.publisher.publish(channelName, JSON.stringify(payload), function (err, reply) { return (err ? reject(err) : accept(reply)); });
        });
    };
    RedisPublisher.prototype.log = function (level, message, meta) {
        if (!this.logger) {
            return;
        }
        this.logger.log(level, message, meta);
    };
    return RedisPublisher;
}());
exports.RedisPublisher = RedisPublisher;
//# sourceMappingURL=publisher.js.map