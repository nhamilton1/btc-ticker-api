-- CreateTable
CREATE TABLE "btc_prices" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "brains_price" DOUBLE PRECISION NOT NULL,
    "yahoo_price" DOUBLE PRECISION NOT NULL,
    "time_price" DOUBLE PRECISION NOT NULL,
    "blockchain_price" DOUBLE PRECISION NOT NULL,
    "binance_price" DOUBLE PRECISION NOT NULL,
    "lunarcrush_price" DOUBLE PRECISION NOT NULL,
    "messari_price" DOUBLE PRECISION NOT NULL,
    "nomics_price" DOUBLE PRECISION NOT NULL,
    "coingecko_price" DOUBLE PRECISION NOT NULL,
    "coindesk_price" DOUBLE PRECISION NOT NULL,
    "bitfinex_price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "btc_prices_pkey" PRIMARY KEY ("id")
);
