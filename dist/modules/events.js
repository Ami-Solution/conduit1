"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Event types
exports.TOKEN_ADDED = 'TOKEN_ADDED';
exports.TOKEN_PAIR_ADDED = 'TOKEN_PAIR_ADDED';
exports.ORDER_UPDATED = 'ORDER_UPDATED';
exports.ORDER_ADDED = 'ORDER_ADDED';
// Event creator
exports.orderAdded = function (order, baseTokenAddress, quoteTokenAddress) {
    return {
        type: exports.ORDER_ADDED,
        payload: {
            order: order,
            baseTokenAddress: baseTokenAddress,
            quoteTokenAddress: quoteTokenAddress,
        },
    };
};
exports.orderUpdated = function (order, orderState, baseTokenAddress, quoteTokenAddress) {
    return {
        type: exports.ORDER_UPDATED,
        payload: {
            order: order,
            orderState: orderState,
            baseTokenAddress: baseTokenAddress,
            quoteTokenAddress: quoteTokenAddress,
        },
    };
};
exports.tokenAdded = function (token) {
    return {
        type: exports.TOKEN_ADDED,
        payload: {
            token: token,
        },
    };
};
exports.tokenPairAdded = function (baseTokenAddress, quoteTokenAddress) {
    return {
        type: exports.TOKEN_PAIR_ADDED,
        payload: {
            baseTokenAddress: baseTokenAddress,
            quoteTokenAddress: quoteTokenAddress,
        },
    };
};
//# sourceMappingURL=events.js.map