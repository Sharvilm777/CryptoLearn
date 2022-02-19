const News = [];

export const setNews = (state = News, action) => {
  switch (action.type) {
    case "SET_NEWS":
      return { ...state, news: action.payload };
    default:
      return state;
  }
};
