import ccxt from "ccxt";
async function findHarami() {
  // Use the 'binance' exchange
  const exchange = new ccxt.coinbasepro({
    rateLimit: 2000,
    enableRateLimit: true,
  });

  // Get candlestick data for the 'BTC/USDT' market with a 1-hour interval
  const ohlcv = await exchange.fetchOHLCV("BTC/USDT", "1m");
  console.log(ohlcv);
  // Iterate through the candlesticks
  let dateNow;

  for (let i = 1; i < ohlcv.length; i++) {
    const [time, open, high, low, close, volume] = ohlcv[i];
    const [prevTime, prevOpen, prevHigh, prevLow, prevClose, prevVolume] =
      ohlcv[i - 1];

    // Check for a "harami" trend
    if (
      prevClose < prevOpen &&
      prevClose < open &&
      close > open &&
      prevOpen > close
    ) {
      console.log(`Found harami trend at ${(dateNow = new Date(
        time
      ).toLocaleString())}: 
                Open: ${open} 
                Close: ${close} 
                PrevOpen: ${prevOpen} 
                PrevClose: ${prevClose}
                bar:${i}
            `);
    }
  }
}

findHarami();
