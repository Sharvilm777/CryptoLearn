const coins = {
  Allcoins: [],
  Topgainer: [],
  Toplosser: [],
  TopTen: [],
  Wallet: 100000,
};
export const setCoins = (state = coins, action) => {
  switch (action.type) {
    case "SET_COINS":
      return { ...state, Allcoins: action.payload };
    case "SET_TOP_GAINER":
      return { ...state, Topgainer: action.payload };
    case "SET_TOP_LOSSER":
      return { ...state, Toplosser: action.payload };
    case "SET_TOP_TEN":
      return { ...state, TopTen: action.payload };
    case "BUY":
      return { ...state, Wallet: state.Wallet - action.payload };
    case "SELL":
      return { ...state, Wallet: state.Wallet + action.payload };
    default:
      return state;
  }
};
