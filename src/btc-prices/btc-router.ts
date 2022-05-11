import express, { Request, Response, NextFunction } from "express";
import { getAll } from "./btc-model";
import json2csv from "json2csv";

const router = express.Router();

const fields = [
  "binance_price",
  "blockchain_price",
  "bitfinex_price",
  "coingecko_price",
  "coindesk_price",
  "lunarcrush_price",
  "messari_price",
  "nomics_price",
  "time_price",
  "yahoo_price",
  "timestamp",
  "brains_price",
  "coinbase_price",
];
const opts = { fields };

router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const parser = new json2csv.Parser(opts);
    const priceData = await getAll();
    const csv = parser.parse(priceData);
    res.attachment("btc-prices.csv").send(csv);
  } catch (err) {
    next(err);
  }
});

export { router as btcRouter };
