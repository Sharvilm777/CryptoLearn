export const BuyCoin = (amount) => {
  return { type: "BUY", payload: amount };
};
export const SellCoin = (amount) => {
  return { type: "SELL", payload: amount };
};
export const SetCoin = (coins) => {
  return { type: "SET_COINS", payload: coins };
};
export const TopGainer = (coins) => {
  return { type: "SET_TOP_GAINER", payload: coins };
};
export const TopLosser = (coins) => {
  return { type: "SET_TOP_LOSSER", payload: coins };
};
export const Topten = (coins) => {
  return { type: "SET_TOP_TEN", payload: coins };
};
export const storeNews = (news) => {
  return { type: "SET_NEWS", payload: news };
};
export const AfterBuy = (coinObj) => {
  return { type: "AFTER_BUY", payload: coinObj };
};
export const UpdateBuy = (coinObj) => {
  return { type: "UPDATE_BUY", payload: coinObj };
};
export const AfterSell = (coinObj) => {
  return { type: "AFTER_SELL", payload: coinObj };
};
export const UpdateSell = (coinObj) => {
  return { type: "UPDATE_SELL", payload: coinObj };
};
