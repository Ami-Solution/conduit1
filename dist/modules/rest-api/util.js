"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_js_1 = require("bignumber.js");
var mapOrderApiPayloadToSignedOrder = function (payload) {
    var order = payload;
    var parsedOrder = {
        maker: order.maker,
        taker: order.taker,
        makerFee: new bignumber_js_1.BigNumber(order.makerFee),
        takerFee: new bignumber_js_1.BigNumber(order.takerFee),
        makerTokenAmount: new bignumber_js_1.BigNumber(order.makerTokenAmount),
        makerTokenAddress: order.makerTokenAddress,
        takerTokenAmount: new bignumber_js_1.BigNumber(order.takerTokenAmount),
        takerTokenAddress: order.takerTokenAddress,
        salt: new bignumber_js_1.BigNumber(order.salt),
        exchangeContractAddress: order.exchangeContractAddress,
        feeRecipient: order.feeRecipient,
        expirationUnixTimestampSec: new bignumber_js_1.BigNumber(order.expirationUnixTimestampSec),
        ecSignature: order.ecSignature,
    };
    return parsedOrder;
};
exports.mapOrderApiPayloadToSignedOrder = mapOrderApiPayloadToSignedOrder;
var mapZeroExPortalOrderJSONToSignedOrder = function (payload) {
    var order = payload;
    var parsedOrder = {
        maker: order.maker.address,
        taker: order.taker.address,
        makerFee: new bignumber_js_1.BigNumber(order.maker.feeAmount),
        takerFee: new bignumber_js_1.BigNumber(order.taker.feeAmount),
        makerTokenAmount: new bignumber_js_1.BigNumber(order.maker.amount),
        makerTokenAddress: order.maker.token.address,
        takerTokenAmount: new bignumber_js_1.BigNumber(order.taker.amount),
        takerTokenAddress: order.taker.token.address,
        salt: new bignumber_js_1.BigNumber(order.salt),
        exchangeContractAddress: order.exchangeContract,
        feeRecipient: order.feeRecipient,
        expirationUnixTimestampSec: new bignumber_js_1.BigNumber(order.expiration),
        ecSignature: {
            r: order.signature.r,
            s: order.signature.s,
            v: order.signature.v,
        },
    };
    return parsedOrder;
};
exports.mapZeroExPortalOrderJSONToSignedOrder = mapZeroExPortalOrderJSONToSignedOrder;
//# sourceMappingURL=util.js.map