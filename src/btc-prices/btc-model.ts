import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type btcPrices = {
    brainsPrice: number,
    yahooPrice: number,
    timePrice: number,
    blockchainPrice: number,
    binancePrice: number,
    lunarcrushPrice: number,
    messariPrice: number,
    nomicsPrice: number,
    coingeckoPrice: number,
    coindeskPrice: number,
    bitfinexPrice: number,
    coinbasePrice: number,
    coinmetricsPrice: number,
    timestamp: Date,
};

async function createBtcPrices(data: btcPrices[]) {
  return await prisma.btc_prices.create({
    data: {
        binance_price: data[0].binancePrice,
        blockchain_price: data[0].blockchainPrice,
        bitfinex_price: data[0].bitfinexPrice,
        coingecko_price: data[0].coingeckoPrice,
        coindesk_price: data[0].coindeskPrice,
        lunarcrush_price: data[0].lunarcrushPrice,
        messari_price: data[0].messariPrice,
        nomics_price: data[0].nomicsPrice,
        time_price: data[0].timePrice,
        yahoo_price: data[0].yahooPrice,
        timestamp: data[0].timestamp,
        brains_price: data[0].brainsPrice,
        coinbase_price: data[0].coinbasePrice,
        coinmetrics_price: data[0].coinmetricsPrice,
    }
  });
}

export const add = async (item: btcPrices[]) => {
  return await createBtcPrices(item);
};


export const getAll = async () => {
  return await prisma.btc_prices.findMany({
    select: {
      binance_price: true,
      blockchain_price: true,
      bitfinex_price: true,
      coingecko_price: true,
      coindesk_price: true,
      lunarcrush_price: true,
      messari_price: true,
      nomics_price: true,
      time_price: true,
      yahoo_price: true,
      timestamp: true,
      brains_price: true,
      coinbase_price: true,
      coinmetrics_price: true,
    }
  });
}