"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
function ConsoleLoggerFactory(options) {
    var logOptions = Object.assign({
        level: 'debug',
        transports: [
            new winston_1.transports.Console({
                colorize: 'all',
                json: false,
                timestamp: true,
            }),
        ],
        colorize: true,
    }, options || {});
    return new winston_1.Logger(logOptions);
}
exports.ConsoleLoggerFactory = ConsoleLoggerFactory;
exports.NullLogger = {
    log: function (level, message, meta) {
        /* no-op */
    },
    error: function (err) {
        /* no-op */
    },
};
//# sourceMappingURL=logger.js.map