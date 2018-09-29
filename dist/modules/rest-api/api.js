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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var express_1 = require("express");
var util_1 = require("./util");
var validate_1 = require("../../util/validate");
var v0ApiRouterFactory = function (client, logger) {
    var router = express_1.Router();
    router.use(bodyParser.json({ type: '*/*' }));
    router.use(bodyParser.urlencoded({ extended: true }));
    router.get('/token_pairs', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, page, per_page, pairs;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.query, page = _a.page, per_page = _a.per_page;
                    return [4 /*yield*/, client.getTokenPairs({ page: page, perPage: per_page })];
                case 1:
                    pairs = _b.sent();
                    res.status(201).json(pairs);
                    return [2 /*return*/];
            }
        });
    }); });
    router.get('/orderbook', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
        var _a, baseTokenAddress, quoteTokenAddress, orderbookForTokenPair, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.query, baseTokenAddress = _a.baseTokenAddress, quoteTokenAddress = _a.quoteTokenAddress;
                    if (!baseTokenAddress) {
                        res.status(400);
                        return [2 /*return*/, next({ errorMessage: 'baseTokenAddress missing' })];
                    }
                    if (!quoteTokenAddress) {
                        res.status(400);
                        return [2 /*return*/, next({ errorMessage: 'quoteTokenAddress missing' })];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    logger.log('verbose', "Querying orderbook for " + baseTokenAddress + " and " + quoteTokenAddress + " pair");
                    return [4 /*yield*/, client.getOrderbook(baseTokenAddress, quoteTokenAddress)];
                case 2:
                    orderbookForTokenPair = _b.sent();
                    return [2 /*return*/, res.status(201).json(orderbookForTokenPair)];
                case 3:
                    err_1 = _b.sent();
                    logger.log('error', 'Error querying for orderbook.', err_1);
                    res.sendStatus(500);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    router.get('/orders', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var options, orders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = req.query;
                    return [4 /*yield*/, client.getOrders(options)];
                case 1:
                    orders = _a.sent();
                    res.status(201).json(orders);
                    return [2 /*return*/];
            }
        });
    }); });
    router.get('/order/:orderHash', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var orderHash, order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    orderHash = req.params.orderHash;
                    return [4 /*yield*/, client.getOrder(orderHash)];
                case 1:
                    order = _a.sent();
                    if (!order) {
                        return [2 /*return*/, res.sendStatus(404)];
                    }
                    res.json(order);
                    return [2 /*return*/];
            }
        });
    }); });
    router.post('/fees', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var body, payload, response;
        return __generator(this, function (_a) {
            body = req.body;
            payload = body;
            response = {
                feeRecipient: '0x13cF20B0a6053bA53855e5574AD049323109B0C4',
                makerFee: '0',
                takerFee: '0',
            };
            res.json(response);
            return [2 /*return*/];
        });
    }); });
    router.post('/order', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
        var body, possibleOrder, EMPTY_TAKER_ADDRESS, validationInfo, e, signedOrder, didAddOrder, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger.log('debug', 'Order endpoint hit, verifying order...');
                    body = req.body;
                    possibleOrder = body;
                    if (possibleOrder.taker === '') {
                        // schema requires a taker, so if null/emptystring we assign empty hex
                        logger.log('debug', 'Order taker adress empty, assigning empty hex address');
                        EMPTY_TAKER_ADDRESS = '0x0000000000000000000000000000000000000000';
                        possibleOrder.taker = EMPTY_TAKER_ADDRESS;
                    }
                    validationInfo = validate_1.validateEndpointSignedOrderBySchema(possibleOrder);
                    if (!validationInfo.valid) {
                        logger.log('debug', 'Order validation failed');
                        e = {
                            code: 101,
                            status: 400,
                            message: "Validation failed",
                            validationErrors: validationInfo.errors,
                        };
                        return [2 /*return*/, next(e)];
                    }
                    signedOrder = util_1.mapOrderApiPayloadToSignedOrder(possibleOrder);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client.postOrder(signedOrder)];
                case 2:
                    didAddOrder = _a.sent();
                    res.sendStatus(201);
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    res.sendStatus(500);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    /**
     * @deprecated experimental for testing only, no validation included.
     */
    router.post('/zeroex-portal-order', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
        var body, payload, signedOrder, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger.log('debug', 'ZeroEx Portal Order Converter hit, adding order');
                    body = req.body;
                    payload = body;
                    signedOrder = util_1.mapZeroExPortalOrderJSONToSignedOrder(payload);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client.postOrder(signedOrder)];
                case 2:
                    _a.sent();
                    res.sendStatus(201);
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    res.sendStatus(500);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    // todo rename tokens
    router.get('/tokens', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var tokens;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.getTokens()];
                case 1:
                    tokens = _a.sent();
                    res.status(201).json(tokens);
                    return [2 /*return*/];
            }
        });
    }); });
    return router;
};
exports.v0ApiRouterFactory = v0ApiRouterFactory;
//# sourceMappingURL=api.js.map