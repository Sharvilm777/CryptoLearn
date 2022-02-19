import { Avatar, Container, Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Linechart from "./Linechart";
const useStyles = makeStyles((theme) => ({
  Box_styling: {
    display: "flex",
    alignItems: "center",
    margin: "10px",
    justifyContent: "space-around",
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
    },
  },
  text_Box_styling: {
    margin: "10px",
    lineHeight: "30px",
  },
  color: {
    color: (Coin) => {
      if (Coin.change > 0) {
        return green[500];
      } else {
        return red[500];
      }
    },
  },
}));
const Coin = () => {
  const [Loading, setLoading] = useState(false);
  const [Coin, setCoin] = useState({});
  const [coinPriceHistory, setcoinPriceHistory] = useState({});
  const { uuid } = useParams();
  let styles = useStyles(Coin);

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
  const fetchCoinById = async (uuid) => {
    const response = await axios
      .get(`https://coinranking1.p.rapidapi.com/coin/${uuid}`, optionsForById)
      .catch((err) => {
        console.log(err);
      });
    console.log(response.data);
    setCoin(response.data.data.coin);
  };
  const fetchCoinPriceHistory = async (uuid) => {
    const response = await axios
      .get(
        `https://coinranking1.p.rapidapi.com/coin/${uuid}/history`,
        optionsForById
      )
      .catch((err) => {
        console.log(err);
      });
    setcoinPriceHistory(response.data.data);
    setLoading(true);
  };
  useEffect(() => {
    fetchCoinById(uuid);
    fetchCoinPriceHistory(uuid);
  }, []);
  return (
    <div>
      {Loading && (
        <Container>
          <Box className={styles.Box_styling}>
            <Avatar
              src={`${Coin.iconUrl}`}
              sx={{ width: "100px", height: "100px" }}
            />
            <h1>{Coin.name}</h1>
            <Typography>
              Current Price: <span>{Coin.price}</span>
            </Typography>
            <Typography>
              Market Cap: <span>{Coin.marketCap}</span>
            </Typography>
            <Typography>
              Change: <span className={styles.color}>{Coin.change}%</span>
            </Typography>
          </Box>
          <Box>
            <Linechart priceHistory={coinPriceHistory} />
          </Box>
          {/* To show the html getting from the API i used dangerouslySetInnerHTML.Remeber that It is very usefull */}
          <h3 className={styles.text_Box_styling}>About {Coin.name}</h3>
          <div
            className={styles.text_Box_styling}
            dangerouslySetInnerHTML={{ __html: Coin.description }}
          ></div>
        </Container>
      )}
    </div>
  );
};

export default Coin;
