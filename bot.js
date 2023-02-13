// harami and sma
import options from "./setups/config.js";
import isHarami from "./indicators/haramicandle.js";
import smaTrend from "./indicators/sma.js";

async function bot() {
  let keepTrackOfTrend = "DOWN";
  try {
    while (true) {
      const SMA_TREND = await smaTrend();
      const ISHARAMI = await isHarami();
      const dateNow = new Date().toLocaleString();
      const trend = SMA_TREND && keepTrackOfTrend !== "up" && ISHARAMI;
      const notTrending = keepTrackOfTrend !== "DOWN" && SMA_TREND !== true;
      if (trend) {
        trend = "up";
        console.log("...");
        console.log("\x1b[32m trending \x1b[0m");
      } else if (notTrending) {
        trend = "DOWN";
        console.log("...");
        console.log("\x1b[31m down trend \x1b[0m");
      } else {
        console.log("...");
        console.log("\x1b[33m scaning.... \x1b[0m");
      }
      console.log(`\x1b[36m ${dateNow} \x1b[0m`);
      console.log("...");

      await new Promise((resolve) => setTimeout(resolve, options.interval));
    }
  } catch (e) {
    console.log(e);
  }
}
bot();
