import { Typography } from "@mui/material";
import { grey, lightBlue } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navbar: {
    display: "flex",
    height: "60px",
    width: "100%",
    backgroundColor: grey[900],
    alignItems: "center",
    justifyContent: "space-between",
    color: "white",
    textDecoration: "none",
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
      height: "120px",
      justifyContent: "center",
      fontSize: "15px",
      alignItems: "center",
      textDecoration: "none",
    },
  },
  main_padding: {
    paddingLeft: "30px",
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 0,
    },
  },
  links: {
    paddingLeft: "15px",
    paddingRight: "15px",
    color: "white",
  },
  button_container_style: {
    margin: "10px",
    [theme.breakpoints.only("xs")]: {
      margin: "15px",
    },
  },
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button_style: {
    border: "1px solid black",
    borderRadius: "5px",
    padding: "8px",
    background: lightBlue[600],
    color: "white",
    marginRight: "30px",
    [theme.breakpoints.only("xs")]: {
      marginRight: "10px",
    },
  },
  fontStyle: {
    fontFamily: "Quicksand",
  },
  balanceStyling: {
    margin: "5px",
    textAlign: "center",
  },
}));
function Navbar() {
  const balance = useSelector((state) => state.Coins.Wallet);

  let style = useStyles();
  return (
    <>
      <Box xs={3} className={style.navbar}>
        <Typography variant="h5" className={style.main_padding}>
          CryptoLearn
        </Typography>
        <Box className={style.main_padding}>
          <Link className={style.links} to="/">
            Home
          </Link>
          <Link className={style.links} to="/coins">
            Prices
          </Link>
          <Link className={style.links} to="/portfolio">
            Portfolio
          </Link>
          <Link className={style.links} to="/news">
            News
          </Link>
          <p className={style.balanceStyling}>
            <span>Wallet Balance : </span>
            {balance.Balance}
          </p>
        </Box>

        <Box className={style.button_container_style}>
          <Link className={style.button_style} to="/login">
            Login
          </Link>
          <Link className={style.button_style} to="/signup">
            sign up
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default Navbar;
