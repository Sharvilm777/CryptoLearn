import { Box, Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TopGainer, TopLosser, Topten } from "../redux/actions/CoinActions";
import TopCoins from "./TopCoins";
let useStyles = makeStyles((theme) => ({
  container_styling: {
    margin: "10px",
  },
  bold: {
    fontWeight: "800",
  },
}));

const Home = () => {
  const dispatch = useDispatch();
  const Topgainer = useSelector((state) => state.Coins.Topgainer);
  const Toplosser = useSelector((state) => state.Coins.Toplosser);
  const TopTen = useSelector((state) => state.Coins.TopTen);

  const style = useStyles();
  const [Name, setName] = useState("");
  let optionsAsc = {
    params: {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      timePeriod: "24h",
      tiers: "1",
      orderBy: "change",
      orderDirection: "asc",
      limit: "10",
      offset: "0",
    },
    headers: {
      "x-rapidapi-host": "coinranking1.p.rapidapi.com",
      "x-rapidapi-key": "e818a2ac84msh1b7e3db0c06c590p17c8a1jsna91177a65c0e",
    },
  };
  let optionstopten = {
    params: {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      timePeriod: "24h",
      tiers: "1",
      orderBy: "marketCap",
      orderDirection: "desc",
      limit: "10",
      offset: "0",
    },
    headers: {
      "x-rapidapi-host": "coinranking1.p.rapidapi.com",
      "x-rapidapi-key": "e818a2ac84msh1b7e3db0c06c590p17c8a1jsna91177a65c0e",
    },
  };
  const optionsDesc = {
    params: {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      timePeriod: "24h",
      tiers: "1",
      orderBy: "change",
      orderDirection: "desc",
      limit: "10",
      offset: "0",
    },
    headers: {
      "x-rapidapi-host": "coinranking1.p.rapidapi.com",
      "x-rapidapi-key": "e818a2ac84msh1b7e3db0c06c590p17c8a1jsna91177a65c0e",
    },
  };
  const fetchTopGAIN = async () => {
    const response = await axios
      .get("https://coinranking1.p.rapidapi.com/coins", optionsDesc)
      .catch((err) => {
        console.log(err);
      });
    dispatch(TopGainer(response.data.data.coins));
  };
  const fetchTopLOSS = async () => {
    const response = await axios
      .get("https://coinranking1.p.rapidapi.com/coins", optionsAsc)
      .catch((err) => {
        console.log(err);
      });
    dispatch(TopLosser(response.data.data.coins));
  };
  const fetchTOPTEN = async () => {
    const response = await axios
      .get("https://coinranking1.p.rapidapi.com/coins", optionstopten)
      .catch((err) => {
        console.log(err);
      });
    dispatch(Topten(response.data.data.coins));
  };
  const getName = () => {
    if (localStorage.getItem("Name") === "") {
      let nameofuser = prompt("Enter Your Name");
      localStorage.setItem("Name", nameofuser);
      setName(localStorage.getItem("Name"));
    } else {
      setName(localStorage.getItem("Name"));
    }
  };
  useEffect(() => {
    getName();
    fetchTopGAIN();
    fetchTopLOSS();
    fetchTOPTEN();
  }, []);

  return (
    <div>
      <Container fixed>
        <Box className={style.container_styling}>
          <Typography variant="h4">Hii {Name}</Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
            aperiam hic corrupti inventore reprehenderit harum neque, deleniti
            unde minus voluptatem enim, animi recusandae eveniet alias ipsam
            voluptatibus tempora optio necessitatibus consequuntur velit. Libero
            reprehenderit architecto numquam similique commodi nesciunt illo,
            repellat cum ipsa nam assumenda.
          </Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, quo
            quas itaque obcaecati, fugiat sit corrupti dolore cupiditate
            repellendus nostrum adipisci asperiores omnis totam voluptatem,
            earum blanditiis commodi dicta. Aliquam quasi facere nisi nemo ut
            dolores error. Necessitatibus modi et autem repellat quas distinctio
            eius dolores alias magnam hic ratione earum maiores error, quaerat
            sunt id deleniti voluptatum, veniam quisquam aut reiciendis
            excepturi ad nostrum ullam! Reiciendis natus voluptatem nesciunt
            enim sint molestias aliquam iure commodi vel odit vero corrupti quis
            tempora recusandae, ducimus non, delectus ad? Nihil, sapiente? Quod
            voluptatum a vero possimus maxime? Fuga voluptatum perferendis
            tenetur incidunt.
          </Typography>
        </Box>
        <TopCoins coinlist={TopTen} title="Top Ten Coins" />
        <TopCoins coinlist={Topgainer} title="Top Gainers 24h" />
        <TopCoins coinlist={Toplosser} title="Top Lossers 24h" />
      </Container>
    </div>
  );
};

export default Home;
