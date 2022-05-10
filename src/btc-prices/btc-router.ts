import express, { Request, Response, NextFunction } from "express";
import axios from "axios";
import { add } from "./btc-model";

const router = express.Router();

interface brainsInter {
  price: number;
  time: number;
}

interface yahooInter {
  chart: {
    result: [
      {
        meta: {
          regularMarketPrice: number;
        };
      }
    ];
  };
}

interface timeInter {
  bitcoin: {
    usd: number;
  };
}

interface blockchainInter {
  last_trade_price: number;
}

interface binanceInter {
  price: string;
}

interface lunarcrushInter {
  data: [
    {
      id: number;
      name: string;
      symbol: string;
      price: number;
    }
  ];
}

interface messariInter {
  data: {
    market_data: {
      price_usd: number;
    };
  };
}

interface nomicsInter {
  items: [
    {
      price: string;
    }
  ];
}

interface coindeskInter {
  bpi: {
    USD: {
      rate_float: number;
    };
  };
}

const brainsPrice = "https://insights.braiins.com/api/v1.0/price-stats";
const yahooPrice = "https://query1.finance.yahoo.com/v8/finance/chart/BTC-USD";
const timePrice =
  "https://time.com/nextadvisor/wp-json/v1/crypto/simple/price?ids=bitcoin&vs_currencies=usd";
const blockchainPrice =
  "https://api.blockchain.com/v3/exchange/tickers/BTC-USD";
const binancePrice =
  "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT";
const lunarcrushPrice = "https://api2.lunarcrush.com/v2?data=assets&symbol=BTC";
const messariPrice = "https://data.messari.io/api/v1/assets/btc/metrics";
const nomicsPrice =
  "https://nomics.com/data/currencies-ticker?filter=any&interval=1d&quote-currency=USD&symbols=BTC";
const coingeckoPrice =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin";
const coindeskPrice = "https://api.coindesk.com/v1/bpi/currentprice.json";
const bitfinexPrice = "https://api-pub.bitfinex.com/v2/tickers?symbols=tBTCUSD";

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

router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  console.time();
  const results: btcPrices[] = [];

  try {
    const resBrainsPrice = await axios.get<brainsInter>(brainsPrice);
    const resYahooPrice = await axios.get<yahooInter>(yahooPrice);
    const resTimePrice = await axios.get<timeInter>(timePrice);
    const resBlockchainPrice = await axios.get<blockchainInter>(
      blockchainPrice
    );
    const resBinancePrice = await axios.get<binanceInter>(binancePrice);
    const resLunarcrushPrice = await axios.get<lunarcrushInter>(
      lunarcrushPrice
    );
    const resMessariPrice = await axios.get<messariInter>(messariPrice);
    const resNomicsPrice = await axios.get<nomicsInter>(nomicsPrice);
    const resCoingeckoPrice = await axios.get(coingeckoPrice);
    const resCoindeskPrice = await axios.get<coindeskInter>(coindeskPrice);
    const resBitfinexPrice = await axios.get(bitfinexPrice);

    results.push({
      brainsPrice: resBrainsPrice.data.price,
      yahooPrice: resYahooPrice.data.chart.result[0].meta.regularMarketPrice,
      timePrice: resTimePrice.data.bitcoin.usd,
      blockchainPrice: resBlockchainPrice.data.last_trade_price,
      binancePrice: parseFloat(resBinancePrice.data.price),
      lunarcrushPrice: resLunarcrushPrice.data.data[0].price,
      messariPrice: resMessariPrice.data.data.market_data.price_usd,
      nomicsPrice: parseFloat(resNomicsPrice.data.items[0].price),
      coingeckoPrice: resCoingeckoPrice.data[0].current_price,
      coindeskPrice: resCoindeskPrice.data.bpi.USD.rate_float,
      bitfinexPrice: resBitfinexPrice.data[0][1],
      timestamp: new Date()
    });

    await add(results);
    res.json(results);
  } catch (err) {
    next(err);
  }
  console.timeEnd();
});

export { router as btcRouter };
