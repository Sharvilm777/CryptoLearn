import { combineReducers } from "redux";
import { coinReducer } from "./coinReducer";
import { setNews } from "./newsReducer";
import { setCoins } from "./setCoinsReducer";

const reducer = combineReducers({
  allCoins: coinReducer,
  Coins: setCoins,
  News: setNews,
});
export default reducer;
