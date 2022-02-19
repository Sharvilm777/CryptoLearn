import { Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SetCoin } from "../redux/actions/CoinActions";
import "../styles/coins.css";
import CoinCard from "./CoinCard";
const Coins = () => {
  const dispatch = useDispatch();
  const coinsList = useSelector((state) => state.Coins.Allcoins);
  let options = {
    params: {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      timePeriod: "24h",
      tiers: "1",
      orderBy: "marketCap",
      orderDirection: "desc",
      limit: "100",
      offset: "0",
    },
    headers: {
      "x-rapidapi-host": "coinranking1.p.rapidapi.com",
      "x-rapidapi-key": "e818a2ac84msh1b7e3db0c06c590p17c8a1jsna91177a65c0e",
    },
  };

  const fetchCoins = async () => {
    const response = await axios
      .get("https://coinranking1.p.rapidapi.com/coins", options)
      .catch((err) => {
        console.log(err);
      });
    dispatch(SetCoin(response.data.data.coins));
  };

  useEffect(() => {
    fetchCoins();
  }, []);
  return (
    <>
      <Grid
        container
        columnSpacing={2}
        rowSpacing={2}
        align="center"
        justifyContent={"space-around"}
      >
        {coinsList.map((coins) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CoinCard coin={coins} key={`${coins.uuid}`} noBtn={true} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Coins;
