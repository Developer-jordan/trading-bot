const axios = require("axios");
const endpoint = "https://api.coinbase.com/api/v3";

async function main() {
  try {
    // Get the current candle information
    const candle = await getCurrentCandle();

    // Calculate the middle of the candle
    const buyPrice = (candle.high + candle.low) / 2;

    // Place a limit buy order at the middle of the candle
    await placeOrder(buyPrice, "buy");

    // Set a stop loss at the previous candle low
    await setStopLoss(candle.low);

    // Set a take profit at the previous candle high
    await setTakeProfit(candle.high);
  } catch (error) {
    console.error(`Error executing trading strategy: ${error.message}`);
  }
}

async function getCurrentCandle() {
  const response = await axios.get(`${endpoint}/candles`);
  const candles = response.data;
  return candles[candles.length - 1];
}

async function placeOrder(price, side) {
  const response = await axios.post(`${endpoint}/orders`, {
    price: price,
    side: side,
    product_id: "BTC-USD",
  });
  console.log(`Placed ${side} order at price ${price}`);
  return response.data;
}

async function setStopLoss(price) {
  const response = await axios.post(`${endpoint}/orders`, {
    stop: "loss",
    price: price,
  });
  console.log(`Set stop loss at price ${price}`);
  return response.data;
}

async function setTakeProfit(price) {
  const response = await axios.post(`${endpoint}/orders`, {
    stop: "profit",
    price: price,
  });
  console.log(`Set take profit at price ${price}`);
  return response.data;
}

// Call the main function
main();
