import ccxt from "ccxt";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
const Exchange = new ccxt.coinbasepro({
  apiKey: process.env.API_KEY,
  secret: process.env.SECRET_KEY,
  // password: process.env.PASS_WORD,
});
export default Exchange;
