import Exchange from "./setups/exchange.js";

// Define the stop-loss and take-profit levels
const stopLoss = 0.05; // 5%
const takeProfit = 0.1; // 10%

async function tradeAPE() {
  // Fetch the current price of APE
  const ticker = await Exchange.fetchTicker("BTC/USD");
  const currentPrice = ticker.last;

  // Calculate the stop-loss and take-profit levels
  const stopLossPrice = currentPrice * (1 - stopLoss);
  const takeProfitPrice = currentPrice * (1 + takeProfit);

  // Place a limit buy order at the current price
  await Exchange.createOrder("BTC/USD", "limit", "buy", 1, currentPrice);

  // Place a stop-loss order at the stop-loss price
  await Exchange.createOrder("BTC/USD", "stop_loss", "sell", 1, stopLossPrice);

  // Place a take-profit order at the take-profit price
  await Exchange.createOrder(
    "BTC/USD",
    "take_profit",
    "sell",
    1,
    takeProfitPrice
  );
}

// tradeAPE();
const e = async () => {
  const wallet = await Exchange.fetchBalance();
  for (let coin in wallet.free) {
    console.log(coin);
  }
};
e();
