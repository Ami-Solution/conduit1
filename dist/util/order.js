"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_js_1 = require("bignumber.js");
var serializeSignedOrder = function (signedOrder) {
    var serializedSignedOrder = {
        exchangeContractAddress: signedOrder.exchangeContractAddress,
        maker: signedOrder.maker,
        taker: signedOrder.taker,
        makerTokenAddress: signedOrder.makerTokenAddress,
        takerTokenAddress: signedOrder.takerTokenAddress,
        feeRecipient: signedOrder.feeRecipient,
        makerTokenAmount: signedOrder.makerTokenAmount.toString(),
        takerTokenAmount: signedOrder.takerTokenAmount.toString(),
        makerFee: signedOrder.makerFee.toString(),
        takerFee: signedOrder.takerFee.toString(),
        expirationUnixTimestampSec: signedOrder.expirationUnixTimestampSec.toString(),
        salt: signedOrder.salt.toString(),
        ecSignature: signedOrder.ecSignature,
    };
    return serializedSignedOrder;
};
exports.serializeSignedOrder = serializeSignedOrder;
var deserializeSignedOrder = function (serializedSignedOrder) {
    var order = {
        exchangeContractAddress: serializedSignedOrder.exchangeContractAddress,
        maker: serializedSignedOrder.maker,
        taker: serializedSignedOrder.taker,
        makerTokenAddress: serializedSignedOrder.makerTokenAddress,
        takerTokenAddress: serializedSignedOrder.takerTokenAddress,
        feeRecipient: serializedSignedOrder.feeRecipient,
        makerTokenAmount: new bignumber_js_1.BigNumber(serializedSignedOrder.makerTokenAmount),
        takerTokenAmount: new bignumber_js_1.BigNumber(serializedSignedOrder.takerTokenAmount),
        makerFee: new bignumber_js_1.BigNumber(serializedSignedOrder.makerFee),
        takerFee: new bignumber_js_1.BigNumber(serializedSignedOrder.takerFee),
        expirationUnixTimestampSec: new bignumber_js_1.BigNumber(serializedSignedOrder.expirationUnixTimestampSec),
        salt: new bignumber_js_1.BigNumber(serializedSignedOrder.salt),
        ecSignature: {
            v: serializedSignedOrder.ecSignature.v,
            r: serializedSignedOrder.ecSignature.r,
            s: serializedSignedOrder.ecSignature.s,
        },
    };
    return order;
};
exports.deserializeSignedOrder = deserializeSignedOrder;
//# sourceMappingURL=order.js.map