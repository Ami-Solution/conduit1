"use strict";
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var expressLogger = require("morgan");
var helmet = require("helmet");
var cors = require("cors");
var expressWsFactory = require("express-ws");
var ProviderEngine = require("web3-provider-engine");
var FilterSubprovider = require("web3-provider-engine/subproviders/filters");
var RpcSubprovider = require("web3-provider-engine/subproviders/rpc");
var redis_1 = require("redis");
var bignumber_js_1 = require("bignumber.js");
var pg_1 = require("pg");
var _0x_js_1 = require("0x.js");
var client_1 = require("./modules/client");
var repository_1 = require("./modules/repository");
var publisher_1 = require("./modules/publisher");
var subscriber_1 = require("./modules/subscriber");
var rest_api_1 = require("./modules/rest-api");
var ws_api_1 = require("./modules/ws-api");
var order_watcher_1 = require("./modules/order-watcher");
var types_1 = require("./types");
var logger_1 = require("./util/logger");
var config_1 = require("./config");
bignumber_js_1.BigNumber.config({
    EXPONENTIAL_AT: 1000,
});
var createApp = function () { return __awaiter(_this, void 0, void 0, function () {
    var isProduction, logger, BLOCKCHAIN_NETWORK_ENDPOINT, BLOCKCHAIN_STARTING_BLOCK, ZEROEX_EXCHANGE_SOL_ADDRESS, providerEngine, zeroEx, redisPublisher, publisher, redisSubscriber, subscriber, repository, pool, e_1, relay, orderWatcher, orders, app, expressWs, wss, webSocketNode;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                isProduction = config_1.default.NODE_ENV === 'production' ? true : false;
                logger = logger_1.ConsoleLoggerFactory({ level: config_1.default.LOG_LEVEL });
                BLOCKCHAIN_NETWORK_ENDPOINT = config_1.default.BLOCKCHAIN_NETWORK_ENDPOINT;
                BLOCKCHAIN_STARTING_BLOCK = config_1.default.BLOCKCHAIN_STARTING_BLOCK;
                ZEROEX_EXCHANGE_SOL_ADDRESS = config_1.default.ZERO_EX_EXCHANGE_SOL_ADDRESS;
                logger.log('info', 'Conduit starting...');
                providerEngine = new ProviderEngine();
                providerEngine.addProvider(new FilterSubprovider());
                providerEngine.addProvider(new RpcSubprovider({ rpcUrl: BLOCKCHAIN_NETWORK_ENDPOINT }));
                providerEngine.start();
                logger.log('verbose', 'Connected to Web3 Provider Engine');
                zeroEx = new _0x_js_1.ZeroEx(providerEngine, {
                    // todo: figure out how to get this dynamically...
                    networkId: 42,
                    orderWatcherConfig: { eventPollingIntervalMs: 1000 },
                });
                logger.log('verbose', 'ZeroEx client set up');
                redisPublisher = config_1.default.REDIS_URL ? redis_1.createClient(config_1.default.REDIS_URL) : redis_1.createClient();
                publisher = new publisher_1.RedisPublisher({ redisPublisher: redisPublisher, logger: logger });
                logger.log('verbose', 'Redis Publisher setup');
                redisSubscriber = config_1.default.REDIS_URL ? redis_1.createClient(config_1.default.REDIS_URL) : redis_1.createClient();
                subscriber = new subscriber_1.RedisSubscriber({ redisSubscriber: redisSubscriber, logger: logger });
                logger.log('verbose', 'Redis Subscriber setup');
                logger.log('debug', 'Connected to Redis instance');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                pool = config_1.default.DATABASE_URL
                    ? new pg_1.Pool({ connectionString: config_1.default.DATABASE_URL })
                    : new pg_1.Pool({
                        host: config_1.default.PGHOST,
                        port: config_1.default.PGPORT,
                        user: config_1.default.PGUSER,
                        password: config_1.default.PGPASSWORD,
                        database: config_1.default.PGDATABASE,
                    });
                repository = new repository_1.PostgresRepository({
                    postgresPool: pool,
                    orderTableName: config_1.default.PG_ORDERS_TABLE_NAME || 'orders',
                    tokenTableName: config_1.default.PG_TOKENS_TABLE_NAME || 'tokens',
                    tokenPairTableName: config_1.default.PG_TOKEN_PAIRS_TABLE_NAME || 'token_pairs',
                    logger: logger,
                });
                return [4 /*yield*/, pool.connect()];
            case 2:
                _a.sent();
                logger.log('debug', "Connected to Postgres database");
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                logger.log('error', 'Error connecting to Postgres', e_1);
                throw e_1;
            case 4:
                relay = new client_1.ConduitRelay({ zeroEx: zeroEx, repository: repository, publisher: publisher, logger: logger });
                logger.log('debug', "Connected to Relay client");
                orderWatcher = new order_watcher_1.OrderWatcher({ zeroEx: zeroEx, relay: relay, subscriber: subscriber, publisher: publisher, logger: logger });
                logger.log('debug', "Connected to OrderWatcher");
                return [4 /*yield*/, relay.getOrders({ isOpen: true })];
            case 5:
                orders = _a.sent();
                return [4 /*yield*/, orderWatcher.watchOrderBatch(orders)];
            case 6:
                _a.sent();
                logger.log('debug', "Subscribed to updates for all " + orders.length + " open orders");
                app = express();
                expressWs = expressWsFactory(app);
                app.set('trust proxy', true);
                app.use('/', express.static(__dirname + '/public'));
                app.use(expressLogger('dev'));
                app.use(helmet());
                app.use(cors());
                // REST
                app.get('/', function (_, res) { return res.send('Welcome to the Conduit Relay API'); });
                app.get('/healthcheck', function (_, res) { return res.sendStatus(200); });
                app.use('/api/v0', rest_api_1.v0ApiRouterFactory(relay, logger));
                logger.log('verbose', 'Configured REST endpoints');
                wss = expressWs.getWss('/ws');
                webSocketNode = new ws_api_1.WebSocketNode({
                    wss: wss,
                    relay: relay,
                    publisher: publisher,
                    subscriber: subscriber,
                    logger: logger,
                });
                app.ws('/ws', function (ws, req, next) { return webSocketNode.connectionHandler(ws, req, next); });
                logger.log('verbose', 'Configured WebSocket endpoints');
                // 404 handler
                app.use(function (req, res, next) {
                    var err = new types_1.RoutingError('Not Found');
                    err.status = 404;
                    next(err);
                });
                app.use(function (error, req, res, next) {
                    res.status(error.status || 500);
                    res.json(__assign({}, error));
                });
                return [2 /*return*/, app];
        }
    });
}); };
exports.default = createApp;
//# sourceMappingURL=app.js.map