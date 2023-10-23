import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";
import CoinCard from "./CoinCard";

let useStyles = makeStyles((theme) => ({
  Top_wrapper: {
    border: "1px solid black",
    padding: "10px",
    borderRadius: "4px",
  },
  flex: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    overflowX: "scroll",
  },
}));
const TopCoins = ({ coinlist, title }) => {
  console.log(coinlist);
  let style = useStyles();
  return (
    <div style={{ marginBottom: "20px" }}>
      <Box className={style.Top_wrapper}>
        <Typography variant="h6" style={{ paddingLeft: "20px" }}>
          {title}
        </Typography>
        <Grid className={style.flex}>
          {coinlist.map((coin) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <CoinCard coin={coin} key={`${coin.uuid}`} noBtn={false} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default TopCoins;
