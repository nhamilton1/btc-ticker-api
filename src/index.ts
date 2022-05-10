import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import { btcRouter } from "./btc-prices/btc-router";

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello World!");
});
server.use("/btc", btcRouter);

server.use(
  (
    err: { status: number; message: string; stack: string },
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return res.status((err.status as number) || 500).json({
      message: err.message,
      stack: err.stack,
    });
  }
);

export { server };