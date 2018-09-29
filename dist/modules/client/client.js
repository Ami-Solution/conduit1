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
var bignumber_js_1 = require("bignumber.js");
var _0x_js_1 = require("0x.js");
var events_1 = require("../events");
var ConduitRelay = /** @class */ (function () {
    function ConduitRelay(_a) {
        var zeroEx = _a.zeroEx, repository = _a.repository, publisher = _a.publisher, logger = _a.logger;
        this.zeroEx = zeroEx;
        this.repository = repository;
        this.publisher = publisher;
        this.logger = logger;
    }
    ConduitRelay.prototype.getTokenPairs = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.repository.getTokenPairs()];
            });
        });
    };
    ConduitRelay.prototype.getOrders = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.repository.getOrders(options)];
            });
        });
    };
    ConduitRelay.prototype.getOrder = function (orderHash) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.repository.getOrder(orderHash)];
            });
        });
    };
    ConduitRelay.prototype.getOrderbook = function (baseTokenAddress, quoteTokenAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.repository.getOrderbookForTokenPair(baseTokenAddress, quoteTokenAddress)];
            });
        });
    };
    ConduitRelay.prototype.getTokens = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.zeroEx.tokenRegistry.getTokensAsync()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ConduitRelay.prototype.postOrder = function (signedOrder) {
        return __awaiter(this, void 0, void 0, function () {
            var orderHash, takerTokenRemainingAmount, addedOrder, _a, baseToken, quoteToken, orderAddedEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        orderHash = _0x_js_1.ZeroEx.getOrderHashHex(signedOrder);
                        return [4 /*yield*/, this.getRemainingTakerAmount(orderHash, signedOrder.takerTokenAmount)];
                    case 1:
                        takerTokenRemainingAmount = _b.sent();
                        return [4 /*yield*/, this.repository.addOrder(orderHash, takerTokenRemainingAmount, signedOrder)];
                    case 2:
                        addedOrder = _b.sent();
                        return [4 /*yield*/, this.repository.getBaseTokenAndQuoteTokenFromMakerAndTaker(addedOrder.takerTokenAddress, addedOrder.makerTokenAddress)];
                    case 3:
                        _a = _b.sent(), baseToken = _a.baseToken, quoteToken = _a.quoteToken;
                        orderAddedEvent = events_1.orderAdded(addedOrder, baseToken, quoteToken);
                        return [4 /*yield*/, this.publisher.publish(events_1.ORDER_ADDED, orderAddedEvent)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, addedOrder];
                }
            });
        });
    };
    ConduitRelay.prototype.updateOrder = function (orderHash, orderState) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedOrder, _a, baseToken, quoteToken, orderUpdatedEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.repository.updateOrder(orderHash, orderState)];
                    case 1:
                        updatedOrder = _b.sent();
                        return [4 /*yield*/, this.repository.getBaseTokenAndQuoteTokenFromMakerAndTaker(updatedOrder.takerTokenAddress, updatedOrder.makerTokenAddress)];
                    case 2:
                        _a = _b.sent(), baseToken = _a.baseToken, quoteToken = _a.quoteToken;
                        orderUpdatedEvent = events_1.orderUpdated(updatedOrder, orderState, baseToken, quoteToken);
                        return [4 /*yield*/, this.publisher.publish(events_1.ORDER_UPDATED, orderUpdatedEvent)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, updatedOrder];
                }
            });
        });
    };
    ConduitRelay.prototype.addTokenPair = function (baseTokenAddress, quoteTokenAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenPairAddedEvent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.addTokenPair(baseTokenAddress, quoteTokenAddress)];
                    case 1:
                        _a.sent();
                        tokenPairAddedEvent = events_1.tokenPairAdded(baseTokenAddress, quoteTokenAddress);
                        return [4 /*yield*/, this.publisher.publish(events_1.TOKEN_PAIR_ADDED, tokenPairAddedEvent)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ConduitRelay.prototype.addToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenAddedEvent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.addToken(token)];
                    case 1:
                        _a.sent();
                        tokenAddedEvent = events_1.tokenAdded(token);
                        return [4 /*yield*/, this.publisher.publish(events_1.TOKEN_ADDED, tokenAddedEvent)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ConduitRelay.prototype.getFees = function (feePayload) {
        return __awaiter(this, void 0, void 0, function () {
            var freeFee;
            return __generator(this, function (_a) {
                freeFee = {
                    feeRecipient: '0x13cf20b0a6053ba53855e5574ad049323109b0c4',
                    makerFee: '0',
                    takerFee: '0',
                };
                return [2 /*return*/, freeFee];
            });
        });
    };
    ConduitRelay.prototype.getBaseTokenAndQuoteTokenFromMakerAndTaker = function (takerTokenAddress, makerTokenAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.repository.getBaseTokenAndQuoteTokenFromMakerAndTaker(takerTokenAddress, makerTokenAddress)];
            });
        });
    };
    ConduitRelay.prototype.getRemainingTakerAmount = function (orderHash, originalTakerTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var takerAmountUnavailable, takerAmountRemaining;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.zeroEx.exchange.getUnavailableTakerAmountAsync(orderHash)];
                    case 1:
                        takerAmountUnavailable = _a.sent();
                        takerAmountRemaining = originalTakerTokenAmount.sub(new bignumber_js_1.BigNumber(takerAmountUnavailable));
                        return [2 /*return*/, takerAmountRemaining];
                }
            });
        });
    };
    ConduitRelay.prototype.log = function (level, message, meta) {
        if (!this.logger) {
            return;
        }
        this.logger.log(level, message, meta);
    };
    return ConduitRelay;
}());
exports.ConduitRelay = ConduitRelay;
//# sourceMappingURL=client.js.map