import options from "../setups/config.js";
import Exchange from "../setups/exchange.js";

const sma21 = async () => {
  try {
    const bars = await Exchange.fetchOHLCV(
      options.assect,
      options.candleTimeFrame,
      undefined,
      21
    );
    let closeBars = bars.map((bar) => bar[4]);
    return closeBars.reduce((a, b) => a + b) / 21;
  } catch (error) {
    console.error(error);
  }
};
const sma9 = async () => {
  try {
    const bars = await Exchange.fetchOHLCV(
      options.assect,
      options.candleTimeFrame,
      undefined,
      9
    );
    let closeBars = bars.map((bar) => bar[4]);
    return closeBars.reduce((a, b) => a + b) / 9;
  } catch (error) {
    console.error(error);
  }
};
const smaTend = async () => {
  try {
    const SMA_9 = await sma9();
    const SMA_21 = await sma21();
    console.table(`\x1b[31m Sma-9 ${SMA_9} \x1b[0m`);
    console.table(`\x1b[32m Sma-21 ${SMA_21} \x1b[0m`);
    if (SMA_9 > SMA_21) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};
export default smaTend;
