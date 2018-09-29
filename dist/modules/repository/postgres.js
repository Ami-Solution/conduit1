"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var sql_template_strings_1 = require("sql-template-strings");
// TODO: TWO PHASE COMMITS w/ ROLLBACK STEP
var PostgresRepository = /** @class */ (function () {
    function PostgresRepository(_a) {
        var postgresPool = _a.postgresPool, orderTableName = _a.orderTableName, tokenTableName = _a.tokenTableName, tokenPairTableName = _a.tokenPairTableName, logger = _a.logger;
        this.pool = postgresPool;
        this.orderTableName = orderTableName || 'orders';
        this.tokenTableName = tokenTableName || 'tokens';
        this.tokenPairsTableName = tokenPairTableName || 'token_pairs';
        this.logger = logger;
    }
    PostgresRepository.prototype.getTokenPairs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, pairs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pool.query(sql_template_strings_1.SQL(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      SELECT \n        t1.address as base_token_address,\n        t1.symbol as base_token_symbol,\n        t1.name as base_token_name,\n        t1.min_amount as base_token_min_amount,\n        t1.max_amount as base_token_max_amount,\n        t1.precision as base_token_precision,\n        t2.address as quote_token_address,\n        t2.symbol as quote_token_symbol,\n        t2.name as quote_token_name,\n        t2.min_amount as quote_token_min_amount,\n        t2.max_amount as quote_token_max_amount,\n        t2.precision as quote_token_precision\n      FROM token_pairs tp\n        INNER JOIN tokens t1 ON (tp.base_token = t1.address)\n        INNER JOIN tokens t2 ON (tp.quote_token = t2.address)\n    "], ["\n      SELECT \n        t1.address as base_token_address,\n        t1.symbol as base_token_symbol,\n        t1.name as base_token_name,\n        t1.min_amount as base_token_min_amount,\n        t1.max_amount as base_token_max_amount,\n        t1.precision as base_token_precision,\n        t2.address as quote_token_address,\n        t2.symbol as quote_token_symbol,\n        t2.name as quote_token_name,\n        t2.min_amount as quote_token_min_amount,\n        t2.max_amount as quote_token_max_amount,\n        t2.precision as quote_token_precision\n      FROM token_pairs tp\n        INNER JOIN tokens t1 ON (tp.base_token = t1.address)\n        INNER JOIN tokens t2 ON (tp.quote_token = t2.address)\n    "]))))];
                    case 1:
                        res = _a.sent();
                        pairs = res.rows.map(function (row) {
                            var pair = (_a = {},
                                _a[row.base_token_symbol] = {
                                    address: row.base_token_address,
                                    maxAmount: row.base_token_max_amount,
                                    minAmount: row.base_token_min_amount,
                                    precision: parseInt(row.base_token_precision, 10),
                                },
                                _a[row.quote_token_symbol] = {
                                    address: row.quote_token_address,
                                    maxAmount: row.quote_token_max_amount,
                                    minAmount: row.quote_token_min_amount,
                                    precision: parseInt(row.quote_token_precision, 10),
                                },
                                _a);
                            return pair;
                            var _a;
                        });
                        return [2 /*return*/, pairs];
                }
            });
        });
    };
    PostgresRepository.prototype.getOrders = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var query, res, formattedOrders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = sql_template_strings_1.SQL(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      SELECT * \n      FROM orders\n    "], ["\n      SELECT * \n      FROM orders\n    "])));
                        // todo, support all options after MVP
                        if (options && options.isOpen) {
                            query.append(sql_template_strings_1.SQL(templateObject_3 || (templateObject_3 = __makeTemplateObject(["WHERE taker_token_remaining_amount > 0"], ["WHERE taker_token_remaining_amount > 0"]))));
                        }
                        return [4 /*yield*/, this.pool.query(query)];
                    case 1:
                        res = _a.sent();
                        formattedOrders = res.rows.map(this.formatOrderFromDb);
                        return [2 /*return*/, formattedOrders];
                }
            });
        });
    };
    PostgresRepository.prototype.getOrder = function (orderHash) {
        return __awaiter(this, void 0, void 0, function () {
            var res, formattedOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pool.query(sql_template_strings_1.SQL(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      SELECT * \n      FROM orders\n      WHERE order_hash = ", "\n    "], ["\n      SELECT * \n      FROM orders\n      WHERE order_hash = ", "\n    "])), orderHash))];
                    case 1:
                        res = _a.sent();
                        if (res.rows.length === 0) {
                            return [2 /*return*/, null];
                        }
                        formattedOrder = this.formatOrderFromDb(res.rows[0]);
                        return [2 /*return*/, formattedOrder];
                }
            });
        });
    };
    PostgresRepository.prototype.updateOrder = function (orderHash, orderState) {
        return __awaiter(this, void 0, void 0, function () {
            var remainingFillableTakerTokenAmount, signedOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        remainingFillableTakerTokenAmount = orderState.remainingFillableTakerTokenAmount;
                        this.updateRemainingTakerTokenAmountForOrderInDatabase(orderHash, remainingFillableTakerTokenAmount);
                        return [4 /*yield*/, this.getOrder(orderHash)];
                    case 1:
                        signedOrder = _a.sent();
                        if (!signedOrder) {
                            throw Error('Could not update, order does not exist');
                        }
                        return [2 /*return*/, signedOrder];
                }
            });
        });
    };
    PostgresRepository.prototype.getOrderbookForTokenPair = function (baseTokenAddress, quoteTokenAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var bidsQueryResPromise, asksQueryResPromise, bidQueryRes, asksQueryRes, bids, asks, orderbookPair, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bidsQueryResPromise = this.pool.query(sql_template_strings_1.SQL(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n      SELECT * \n      FROM orders\n      WHERE maker_token_address = ", "\n        and taker_token_address = ", "\n    "], ["\n      SELECT * \n      FROM orders\n      WHERE maker_token_address = ", "\n        and taker_token_address = ", "\n    "])), baseTokenAddress, quoteTokenAddress));
                        asksQueryResPromise = this.pool.query(sql_template_strings_1.SQL(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n      SELECT * \n      FROM orders\n      WHERE maker_token_address = ", "\n        and taker_token_address = ", "\n  "], ["\n      SELECT * \n      FROM orders\n      WHERE maker_token_address = ", "\n        and taker_token_address = ", "\n  "])), quoteTokenAddress, baseTokenAddress));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, bidsQueryResPromise];
                    case 2:
                        bidQueryRes = _a.sent();
                        return [4 /*yield*/, asksQueryResPromise];
                    case 3:
                        asksQueryRes = _a.sent();
                        bids = bidQueryRes.rows.map(this.formatOrderFromDb);
                        asks = asksQueryRes.rows.map(this.formatOrderFromDb);
                        orderbookPair = {
                            bids: bids,
                            asks: asks,
                        };
                        return [2 /*return*/, orderbookPair];
                    case 4:
                        err_1 = _a.sent();
                        this.log('debug', "Error querying for bids and asks", err_1);
                        throw err_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PostgresRepository.prototype.getFees = function (feePayload) {
        return __awaiter(this, void 0, void 0, function () {
            var freeFee;
            return __generator(this, function (_a) {
                freeFee = {
                    feeRecipient: '0x0000000000000000000000000000000000000000',
                    makerFee: '0',
                    takerFee: '0',
                };
                return [2 /*return*/, freeFee];
            });
        });
    };
    PostgresRepository.prototype.addOrder = function (orderHash, takerTokenRemainingAmount, signedOrder) {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pool.query(sql_template_strings_1.SQL(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n      INSERT INTO \n        orders (\n          exchange_contract_address, \n          maker, \n          taker, \n          maker_token_address, \n          taker_token_address, \n          fee_recipient, \n          maker_token_amount, \n          taker_token_amount, \n          maker_fee,\n          taker_fee, \n          expiration_unix_timestamp_sec, \n          salt, \n          ec_sig_v, \n          ec_sig_r, \n          ec_sig_s,\n          order_hash,\n          taker_token_remaining_amount\n        ) \n        VALUES(\n          ", ", \n          ", ", \n          ", ", \n          ", ", \n          ", ", \n          ", ", \n          ", ", \n          ", ", \n          ", ", \n          ", ", \n          ", ", \n          ", ", \n          ", ", \n          ", ", \n          ", ",\n          ", ",\n          ", "\n      )"], ["\n      INSERT INTO \n        orders (\n          exchange_contract_address, \n          maker, \n          taker, \n          maker_token_address, \n          taker_token_address, \n          fee_recipient, \n          maker_token_amount, \n          taker_token_amount, \n          maker_fee,\n          taker_fee, \n          expiration_unix_timestamp_sec, \n          salt, \n          ec_sig_v, \n          ec_sig_r, \n          ec_sig_s,\n          order_hash,\n          taker_token_remaining_amount\n        ) \n        VALUES(\n          ", ", \n          ", ", \n          ", ", \n          ", ", \n          ", ", \n          ", ", \n          ", ", \n          ", ", \n          ", ", \n          ", ", \n          ", ", \n          ", ", \n          ", ", \n          ", ", \n          ", ",\n          ", ",\n          ", "\n      )"])), signedOrder.exchangeContractAddress, signedOrder.maker, signedOrder.taker, signedOrder.makerTokenAddress, signedOrder.takerTokenAddress, signedOrder.feeRecipient, signedOrder.makerTokenAmount.toString(), signedOrder.takerTokenAmount.toString(), signedOrder.makerFee.toString(), signedOrder.takerFee.toString(), signedOrder.expirationUnixTimestampSec.toString(), signedOrder.salt.toString(), signedOrder.ecSignature.v, signedOrder.ecSignature.r, signedOrder.ecSignature.s, orderHash, takerTokenRemainingAmount.toString()))];
                    case 1:
                        res = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        this.log('error', "Error inserting order " + orderHash + " into postgres.", err_2);
                        throw err_2;
                    case 3: return [2 /*return*/, signedOrder];
                }
            });
        });
    };
    PostgresRepository.prototype.addTokenPair = function (baseTokenAddress, quoteTokenAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pool.query(sql_template_strings_1.SQL(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n      INSERT \n      INTO    token_pairs\n              (base_token, quote_token)\n      VALUES  (", ", ", ")\n    "], ["\n      INSERT \n      INTO    token_pairs\n              (base_token, quote_token)\n      VALUES  (", ", ", ")\n    "])), baseTokenAddress, quoteTokenAddress))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PostgresRepository.prototype.addToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // note: right now we're overloading 'precision' column with 'decimals' value, need to post issue on relayer spec asking for clarification
                    return [4 /*yield*/, this.pool.query(sql_template_strings_1.SQL(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n      INSERT \n      INTO    tokens\n              (address, symbol, min_amount, max_amount, precision, name)\n      VALUES  (", ", ", ", ", ", ", ", ", ", ", ")\n    "], ["\n      INSERT \n      INTO    tokens\n              (address, symbol, min_amount, max_amount, precision, name)\n      VALUES  (", ", ", ", ", ", ", ", ",
                            ", ", ")\n    "])), token.address, token.symbol, 0, 1000000000000000000, token.decimals, token.name))];
                    case 1:
                        // note: right now we're overloading 'precision' column with 'decimals' value, need to post issue on relayer spec asking for clarification
                        _a.sent();
                        return [2 /*return*/, token];
                }
            });
        });
    };
    PostgresRepository.prototype.getBaseTokenAndQuoteTokenFromMakerAndTaker = function (takerTokenAddress, makerTokenAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var res, _a, base_token, quote_token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.pool.query(sql_template_strings_1.SQL(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n    SELECT base_token, quote_token\n    FROM token_pairs\n    WHERE (base_token = ", " AND quote_token = ", ")\n       OR (base_token = ", " AND quote_token = ", ")\n    "], ["\n    SELECT base_token, quote_token\n    FROM token_pairs\n    WHERE (base_token = ", " AND quote_token = ", ")\n       OR (base_token = ", " AND quote_token = ", ")\n    "])), takerTokenAddress, makerTokenAddress, makerTokenAddress, takerTokenAddress))];
                    case 1:
                        res = _b.sent();
                        if (res.rowCount < 1) {
                            throw Error('Could not find token pair');
                        }
                        _a = res.rows[0], base_token = _a.base_token, quote_token = _a.quote_token;
                        return [2 /*return*/, {
                                baseToken: base_token,
                                quoteToken: quote_token,
                            }];
                }
            });
        });
    };
    PostgresRepository.prototype.updateRemainingTakerTokenAmountForOrderInDatabase = function (orderHash, filledTakerTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pool.query(sql_template_strings_1.SQL(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n      UPDATE orders \n      SET taker_token_remaining_amount = taker_token_remaining_amount - ", "\n      WHERE order_hash = ", ";\n    "], ["\n      UPDATE orders \n      SET taker_token_remaining_amount = taker_token_remaining_amount - ", "\n      WHERE order_hash = ", ";\n    "])), filledTakerTokenAmount.toString(), orderHash))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // consolidate with getOrder
    PostgresRepository.prototype.getFullOrder = function (orderHash) {
        return __awaiter(this, void 0, void 0, function () {
            var res, formattedOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pool.query(sql_template_strings_1.SQL(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n        SELECT * \n        FROM orders\n        WHERE order_hash = ", "\n      "], ["\n        SELECT * \n        FROM orders\n        WHERE order_hash = ", "\n      "])), orderHash))];
                    case 1:
                        res = _a.sent();
                        if (res.rows.length === 0) {
                            this.log('verbose', "No order " + orderHash + " found in database");
                            return [2 /*return*/, null];
                        }
                        formattedOrder = __assign({}, this.formatOrderFromDb(res.rows[0]), { takerTokenAmountRemaining: res.rows[0]['remaining_taker_taken_amount'] });
                        return [2 /*return*/, formattedOrder];
                }
            });
        });
    };
    PostgresRepository.prototype.validatePostgresInstance = function () {
        var _this = this;
        this.pool
            .query(sql_template_strings_1.SQL(templateObject_13 || (templateObject_13 = __makeTemplateObject(["SELECT to_regclass(", ")"], ["SELECT to_regclass(", ")"])), this.orderTableName))
            .then(function (res) { return !res.rows[0].to_regclass && _this.log('debug', 'Orders table does not exist'); })
            .catch(function (e) { return _this.log('error', 'Error checking if orders table exists'); });
    };
    PostgresRepository.prototype.formatOrderFromDb = function (dbOrder) {
        var order = {
            exchangeContractAddress: dbOrder.exchange_contract_address,
            maker: dbOrder.maker,
            taker: dbOrder.taker,
            makerTokenAddress: dbOrder.maker_token_address,
            takerTokenAddress: dbOrder.taker_token_address,
            feeRecipient: dbOrder.fee_recipient,
            makerTokenAmount: new bignumber_js_1.BigNumber(dbOrder.maker_token_amount),
            takerTokenAmount: new bignumber_js_1.BigNumber(dbOrder.taker_token_amount),
            makerFee: new bignumber_js_1.BigNumber(dbOrder.maker_fee),
            takerFee: new bignumber_js_1.BigNumber(dbOrder.taker_fee),
            expirationUnixTimestampSec: new bignumber_js_1.BigNumber(dbOrder.expiration_unix_timestamp_sec),
            salt: new bignumber_js_1.BigNumber(dbOrder.salt),
            ecSignature: {
                v: parseInt(dbOrder.ec_sig_v, 10),
                r: dbOrder.ec_sig_r,
                s: dbOrder.ec_sig_s,
            },
        };
        return order;
    };
    PostgresRepository.prototype.log = function (level, message, meta) {
        if (!this.logger) {
            return;
        }
        this.logger.log(level, message, meta);
    };
    return PostgresRepository;
}());
exports.PostgresRepository = PostgresRepository;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13;
//# sourceMappingURL=postgres.js.map