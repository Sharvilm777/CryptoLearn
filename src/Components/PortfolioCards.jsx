import { Avatar, Button, Card, CardContent, Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";

let useStyle = makeStyles((theme) => ({
  card_style: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
    },
  },
  mobileDisplay: {
    minWidth: "550px",
    margin: "10px",
    [theme.breakpoints.only("xs")]: {
      fontSize: "16px",
      minWidth: "100px",
    },
  },
  colorOfChange: {
    color: (valueNow) => {
      if (valueNow > 0) {
        return green[800];
      } else {
        return red[500];
      }
    },
  },
}));
const PortfolioCards = ({ coin, updatebtn }) => {
  const [newArr, setnewArr] = useState({});
  let current = newArr.price * coin.amountOfCoins;
  let Invested = coin.buyingPrice * coin.amountOfCoins;
  let valueNow = current - Invested;
  let optionsForById = {
    params: {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      timePeriod: "24h",
    },
    headers: {
      "x-rapidapi-host": "coinranking1.p.rapidapi.com",
      "x-rapidapi-key": "e818a2ac84msh1b7e3db0c06c590p17c8a1jsna91177a65c0e",
    },
  };
  const fetchCoinById = async (coinId) => {
    const response = await axios
      .get(`https://coinranking1.p.rapidapi.com/coin/${coinId}`, optionsForById)
      .catch((err) => {
        console.log(err);
      });
    setnewArr(response.data.data.coin);
    updatebtn(response.data.data.coin);
  };
  useEffect(() => {
    fetchCoinById(coin.coinId);
  }, []);
  let style = useStyle(valueNow);
  return (
    <>
      <Card className={style.mobileDisplay}>
        <CardContent className={style.card_style}>
          <Avatar src={coin.iconUrl}></Avatar>
          <span>{coin.tokenName}</span>
          <span>Coins you have:{coin.amountOfCoins}</span>
        </CardContent>
        <hr />
        <CardContent className={style.card_style}>
          <Typography>
            Invested:<span>{coin.orderAmount.toFixed(3)}</span>
          </Typography>
          <Typography>
            Current:
            <span>{current.toFixed(3)}</span>
          </Typography>
          <Typography>
            Returns:
            <span className={style.colorOfChange}>{valueNow.toFixed(3)}</span>
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default PortfolioCards;
