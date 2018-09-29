"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _0x_js_1 = require("0x.js");
var order_1 = require("../../util/order");
var events_1 = require("../events");
var OrderWatcher = /** @class */ (function () {
    function OrderWatcher(_a) {
        var zeroEx = _a.zeroEx, relay = _a.relay, publisher = _a.publisher, subscriber = _a.subscriber, logger = _a.logger;
        var _this = this;
        this.watchedOrders = new Set();
        // todo finish this logic...
        this.handleOrderStateUpdate = function (orderState) { return __awaiter(_this, void 0, void 0, function () {
            var orderHash, orderRelevantState, orderHash, error;
            return __generator(this, function (_a) {
                if (isOrderStateValid(orderState)) {
                    orderHash = orderState.orderHash, orderRelevantState = orderState.orderRelevantState;
                    this.log('verbose', "Order " + orderHash + " update (valid)\n        Remaining maker amount: " + orderRelevantState.remainingFillableMakerTokenAmount.toString() + "\n        Remaining taker amount: " + orderRelevantState.remainingFillableTakerTokenAmount.toString(), orderRelevantState);
                    this.relay.updateOrder(orderHash, orderRelevantState);
                    return [2 /*return*/];
                }
                else {
                    orderHash = orderState.orderHash, error = orderState.error;
                    return [2 /*return*/];
                }
                return [2 /*return*/];
            });
        }); };
        this.zeroEx = zeroEx;
        this.relay = relay;
        this.publisher = publisher;
        this.subscriber = subscriber;
        this.logger = logger;
        this.log('verbose', "OrderWatcher subscribing to " + events_1.ORDER_ADDED + " message channel");
        this.subscriber.subscribe(events_1.ORDER_ADDED, this.handleOrderAddedEvent.bind(this));
        this.log('verbose', "OrderWatcher subscribed to " + events_1.ORDER_ADDED + " message channel");
        this.zeroEx.orderStateWatcher.subscribe(this.handleOrderStateUpdate.bind(this));
        this.log('verbose', 'OrderWatcher initialized ZeroEx OrderStateWatcher subscription');
    }
    OrderWatcher.prototype.handleOrderAddedEvent = function (orderAddedEvent) {
        return __awaiter(this, void 0, void 0, function () {
            var type, payload, signedOrder, orderHash;
            return __generator(this, function (_a) {
                type = orderAddedEvent.type, payload = orderAddedEvent.payload;
                signedOrder = order_1.deserializeSignedOrder(orderAddedEvent.payload.order);
                orderHash = _0x_js_1.ZeroEx.getOrderHashHex(orderAddedEvent.payload.order);
                this.log('debug', "OrderWatcher: New order added, adding to active watcher " + orderHash, orderAddedEvent);
                this.watchOrder(signedOrder);
                return [2 /*return*/];
            });
        });
    };
    OrderWatcher.prototype.watchOrderBatch = function (orders) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(orders.map(this.watchOrder.bind(this)))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OrderWatcher.prototype.watchOrder = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var orderHash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderHash = _0x_js_1.ZeroEx.getOrderHashHex(order);
                        console.log(orderHash);
                        if (this.watchedOrders.has(orderHash)) {
                            return [2 /*return*/];
                        }
                        this.watchedOrders.add(orderHash);
                        return [4 /*yield*/, this.zeroEx.orderStateWatcher.addOrder(order)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OrderWatcher.prototype.log = function (level, message, meta) {
        if (!this.logger) {
            return;
        }
        this.logger.log(level, message, meta);
    };
    return OrderWatcher;
}());
exports.OrderWatcher = OrderWatcher;
var isOrderStateValid = function (orderState) {
    return orderState.isValid;
};
//# sourceMappingURL=watcher.js.map