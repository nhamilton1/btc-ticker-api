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
    }
  });
}

export const add = async (item: btcPrices[]) => {
  return await createBtcPrices(item);
};
