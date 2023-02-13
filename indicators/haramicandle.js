import options from "../setups/config.js";
import Exchange from "../setups/exchange.js";
const isHarami = async () => {
  const candles = await Exchange.fetchOHLCV(
    options.assect,
    options.candleTimeFrame
  );
  if (
    candles[candles.length - 2].close < candles[candles.length - 2].open &&
    candles[candles.length - 2].close < candles[candles.length - 1].open &&
    candles[candles.length - 1].close > candles[candles.length - 1].open &&
    candles[candles.length - 2].open > candles[candles.length - 1].close
  ) {
    return true;
  } else {
    return false;
  }
};
export default isHarami;
