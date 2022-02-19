import { Card, CardContent, Container, Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import PortfolioCards from "./PortfolioCards";

let useStyle = makeStyles((theme) => ({
  margin_to_box: {
    marginTop: "10px",
  },
  container_style: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    [theme.breakpoints.only("xs")]: {
      fontSize: "10px",
      minWidth: "80%",
      flexDirection: "column",
    },
  },
  card_style: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
    },
  },
  box_style: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    [theme.breakpoints.only("xs")]: {
      justifyContent: "center",
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
  heading: {
    [theme.breakpoints.only("xs")]: {
      textAlign: "center",
    },
  },
  colorOfChange: {
    color: (Now) => {
      if (Now > 0) {
        return green[800];
      } else {
        return red[500];
      }
    },
  },
}));
const Portfolio = () => {
  let coins = useSelector((state) => state.allCoins.coins);

  const [invested, setInvested] = useState(0);
  const [current, setCurrent] = useState(0);
  let Now = current - invested;
  let style = useStyle(Now);
  const getInvestedValue = () => {
    coins.map((coin) => {
      let value = invested + coin.orderAmount;
      setInvested((previnvested) => previnvested + value);
    });
  };
  const getcurrentValue = (value) => {
    for (let i = 0; i < coins.length; i++) {
      if (value.uuid === coins[i].id) {
        let total = coins[i].AmountOfCoins * value.price;
        setCurrent((prevcurrent) => prevcurrent + total);
      }
    }
  };
  useEffect(() => {
    getInvestedValue();
  }, []);
  return (
    <div>
      <Container>
        <Box className={style.margin_to_box}>
          <Card variant="outlined">
            <CardContent className={style.container_style}>
              <Typography>
                Invested Value:<span>{invested.toFixed(3)}</span>
              </Typography>
              <Typography>
                Current Value:<span> {current.toFixed(3)}</span>
              </Typography>

              <Typography>
                Returns :
                <span className={style.colorOfChange}>{Now.toFixed(3)}</span>
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Typography variant="h5" className={style.heading} onClick={fetch}>
          Invested Coins
        </Typography>
        <Box className={style.box_style}>
          {coins.map((coin) => (
            <>
              <PortfolioCards
                coin={coin}
                key={coin.id}
                updatebtn={getcurrentValue}
              />
            </>
          ))}
        </Box>
      </Container>
    </div>
  );
};

export default Portfolio;
