const ccxt = require("ccxt");
require("dotenv").config();
// const express = require("express");
// const app = express();
// const port = process.env.PORT || 3000;

const { stringify } = require("querystring");
const config = require("./setups/config.js");
const EMA = require("technicalindicators").EMA;

const coinBaseExchange = new ccxt.coinbasepro({
  apiKey: process.env.API_KEY,
  secret: process.env.SECRET_KEY,
  password: process.env.PASS_WORD,
});
let closeBars = [];
let order = "sell";
const time = 1000 * 60;
let movingAverage21, movingAverage9;

const getHistoryBars = async () => {
  const bars = await coinBaseExchange.fetchOHLCV(
    config.assect,
    (timeframe = "5m"),
    (since = undefined),
    (limit = 50)
  );
  bars.forEach((bar) => {
    const close = bar[4];
    closeBars.push(close);
  });
};

const runEmaBot = async () => {
  const data = await getHistoryBars();

  while (true) {
    const dateNow = new Date().toLocaleString();
    movingAverage21 = [];
    movingAverage9 = [];
    movingAverage9 = EMA.calculate({ period: 9, values: closeBars });
    movingAverage21 = EMA.calculate({ period: 21, values: closeBars });

    const ema21 = movingAverage21.at(-1);
    const ema9 = movingAverage9.at(-1);
    const beforeEma21 = movingAverage21.at(-2);
    const beforeEma9 = movingAverage9.at(-2);

    if (ema21 < ema9 && beforeEma21 > beforeEma9 && order === "sell") {
      console.log("buy");

      //place a market buy order
      //get the current price
      //set stoploss with the current price * 0.5
      order = "buy";
    } else if (ema21 > ema9 && beforeEma21 < beforeEma9 && order === "buy") {
      console.log("sell");
      //place sell market order
      //cancel stoploss

      order = "sell";
    } else {
      console.table({ dateNow, ema21, ema9 });
    }
    const ticker = await coinBaseExchange.fetchTicker(config.assect);
    closeBars.push(ticker.close);
    await new Promise((resolve) => setTimeout(resolve, time));
  }
};
runEmaBot();
// app.get("/bot", (req, res) => {
// res.send("hello");
// });

// app.listen(port, () => console.log(`server running on port ${port}`));
