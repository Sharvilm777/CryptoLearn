const coinState = {
  coins: [],
};
export const coinReducer = (state = coinState, action) => {
  switch (action.type) {
    case "AFTER_BUY": {
      let avaliable = false;
      const newArr = [...state.coins];
      newArr.map((coin) => {
        if (coin.id === action.payload.id) {
          coin.AmountOfCoins += action.payload.AmountOfCoins;
          coin.orderamount += action.payload.orderamount;
          avaliable = true;
        }
      });
      if (!avaliable) {
        newArr.push(action.payload);
      }
      return { coins: newArr };
    }
    case "AFTER_SELL":
      let avaliable = false;
      let newArr = [...state.coins];
      newArr.map((coin) => {
        if (coin.id === action.payload.id) {
          if (coin.AmountOfCoins > action.payload.AmountOfCoins) {
            coin.AmountOfCoins -= action.payload.AmountOfCoins;
            coin.orderAmount -= action.payload.orderAmount;
            coin.sellingPrice = action.payload.sellingPrice;
            avaliable = true;
          } else {
            newArr = newArr.filter((c) => c.id !== action.payload.id);
          }
        }
      });
      return { coins: newArr };
    default:
      return state;
  }
};
