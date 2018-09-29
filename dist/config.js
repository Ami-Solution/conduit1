"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    PORT: parseInt(process.env.PORT || '', 10) || 3001,
    NODE_ENV: process.env.NODE_ENV,
    LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
    BLOCKCHAIN_NETWORK_ENDPOINT: process.env.BLOCKCHAIN_NETWORK_ENDPOINT || 'https://kovan.infura.io',
    BLOCKCHAIN_STARTING_BLOCK: process.env.BLOCKCHAIN_NETWORK_ENDPOINT || 'latest',
    ZERO_EX_EXCHANGE_SOL_ADDRESS: process.env.ZERO_EX_EXCHANGE_SOL_ADDRESS || '0x90fe2af704b34e0224bf2299c838e04d4dcf1364',
    DATA_STORE: process.env.DATA_STORE || 'postgres',
    DATABASE_URL: process.env.DATABASE_URL,
    PGUSER: process.env.PGUSER || 'postgres',
    PGHOST: process.env.PGHOST || 'localhost',
    PGPASSWORD: process.env.PGPASSWORD,
    PGDATABASE: 'zeroex',
    PGPORT: parseInt(process.env.PGPORT || '', 10) || 5432,
    PG_ORDERS_TABLE_NAME: 'orders',
    PG_TOKENS_TABLE_NAME: 'tokens',
    PG_TOKEN_PAIRS_TABLE_NAME: 'token_pairs',
    PG_APP_TABLE_NAME: 'app',
    PG_POPULATE_DATABASE: process.env.PG_POPULATE_DATABASE === 'true' || false,
    REDIS_URL: process.env.REDIS_URL,
};
exports.default = config;
//# sourceMappingURL=config.js.map