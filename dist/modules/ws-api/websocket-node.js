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
var WebSocket = require("ws");
var events_1 = require("../events");
var order_1 = require("../../util/order");
var WebSocketNode = /** @class */ (function () {
    function WebSocketNode(_a) {
        var relay = _a.relay, wss = _a.wss, publisher = _a.publisher, subscriber = _a.subscriber, logger = _a.logger;
        var _this = this;
        this.relay = relay;
        this.wsServerRef = wss;
        this.publisher = publisher;
        this.subscriber = subscriber;
        this.logger = logger;
        this.connections = new Set();
        this.log('verbose', "WebSocket node subscribing to ORDER_ADDED message channel");
        var orderAddedSubId = this.subscriber.subscribe(events_1.ORDER_ADDED, function (payload) {
            _this.log('verbose', "Received message from redis for added order");
            _this.onOrderAddOrUpdateEvent(payload);
        });
        this.log('verbose', "WebSocket node subscribing to ORDER_UPDATED message channel");
        var orderUpdateSubId = this.subscriber.subscribe(events_1.ORDER_UPDATED, function (payload) {
            _this.log('verbose', "Received message from redis for updated order");
            _this.onOrderAddOrUpdateEvent(payload);
        });
    }
    WebSocketNode.prototype.connectionHandler = function (socket, req, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var connectionContext;
            return __generator(this, function (_a) {
                this.log('verbose', 'WebSocket client connected to WebSocket Server');
                connectionContext = {
                    socket: socket,
                    subscriptions: [],
                    initialized: false,
                    subscriptionCount: 0,
                    subscriptionIdMap: new Map(),
                };
                socket.on('error', function (err) { return _this.log('error', JSON.stringify(err)); });
                socket.on('close', this.handleDisconnectFromClientSocket(connectionContext));
                socket.on('message', this.onMessageFromClientSocket(connectionContext));
                this.connections.add(connectionContext);
                return [2 /*return*/];
            });
        });
    };
    WebSocketNode.prototype.onOrderAddOrUpdateEvent = function (orderAddEvent) {
        var _this = this;
        var _a = orderAddEvent.payload, baseTokenAddress = _a.baseTokenAddress, quoteTokenAddress = _a.quoteTokenAddress;
        var subscriptionChannel = baseTokenAddress + "-" + quoteTokenAddress;
        this.connections.forEach(function (connection) {
            if (connection.subscriptions.find(function (s) { return s === subscriptionChannel; })) {
                var channelId = connection.subscriptionIdMap.get(subscriptionChannel) || 0;
                var message = {
                    type: 'update',
                    channel: 'orderbook',
                    channelId: channelId,
                    payload: order_1.serializeSignedOrder(orderAddEvent.payload.order),
                };
                _this.sendMessage(connection, message);
            }
        });
    };
    WebSocketNode.prototype.onMessageFromClientSocket = function (connectionContext) {
        var _this = this;
        return function (message) {
            // initialize
            if (!connectionContext.initialized) {
                _this.sendKeepAlive(connectionContext);
                var keepAliveTimer_1 = setInterval(function () {
                    if (connectionContext.socket.readyState === WebSocket.OPEN) {
                        _this.sendKeepAlive(connectionContext);
                    }
                    else {
                        clearInterval(keepAliveTimer_1);
                        if (_this.connections.has(connectionContext)) {
                            _this.log('debug', 'Keepalive found a stale connection, removing');
                            _this.handleDisconnectFromClientSocket(connectionContext);
                        }
                    }
                }, 20000);
                connectionContext.initialized = true;
            }
            _this.log('verbose', 'WebSocket server received message from a client WebSocket', message);
            var data = { type: 'default' };
            try {
                data = JSON.parse(message.toString());
            }
            catch (_a) {
                data = message;
            }
            switch (data.type) {
                case 'subscribe':
                    _this.log('debug', "WebSocket subscribe request received");
                    var subscribeRequest = data;
                    _this.handleSubscriptionRequest(connectionContext, subscribeRequest);
                    break;
                default:
                    _this.log('debug', "Unrecognized message type " + data.type + " received from client websocket");
                    break;
            }
        };
    };
    WebSocketNode.prototype.handleDisconnectFromClientSocket = function (context) {
        var _this = this;
        return function (code, reason) {
            _this.log('verbose', "WebSocket connection closed with code " + code, reason) ||
                _this.connections.delete(context);
        };
    };
    WebSocketNode.prototype.handleSubscriptionRequest = function (context, subscriptionRequest) {
        var _this = this;
        var channel = subscriptionRequest.channel, type = subscriptionRequest.type, payload = subscriptionRequest.payload;
        var baseTokenAddress = payload.baseTokenAddress, quoteTokenAddress = payload.quoteTokenAddress, limit = payload.limit, snapshotRequested = payload.snapshot;
        var subscriptionChannel = baseTokenAddress + "-" + quoteTokenAddress;
        var channelId = context.subscriptionCount++;
        context.subscriptionIdMap.set(subscriptionChannel, channelId);
        context.subscriptions.push(subscriptionChannel);
        if (snapshotRequested) {
            this.relay
                .getOrderbook(baseTokenAddress, quoteTokenAddress)
                .then(function (snapshot) {
                var message = {
                    type: 'snapshot',
                    channel: 'orderbook',
                    channelId: channelId,
                    payload: snapshot,
                };
                _this.sendMessage(context, message);
            })
                .catch(function (e) { return _this.log('error', "Error getting snapshot for " + subscriptionChannel); });
        }
    };
    WebSocketNode.prototype.sendKeepAlive = function (connectionContext) {
        this.sendMessage(connectionContext, { type: 'keepalive', channel: 'keepalive', payload: {} });
    };
    WebSocketNode.prototype.sendMessage = function (connectionContext, message) {
        if (message && connectionContext.socket.readyState === WebSocket.OPEN) {
            connectionContext.socket.send(JSON.stringify(message));
        }
    };
    WebSocketNode.prototype.log = function (level, message, meta) {
        if (!this.logger) {
            return;
        }
        this.logger.log(level, message, meta);
    };
    return WebSocketNode;
}());
exports.WebSocketNode = WebSocketNode;
//# sourceMappingURL=websocket-node.js.map