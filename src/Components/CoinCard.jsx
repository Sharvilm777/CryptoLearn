import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import {
  Avatar,
  Button,
  CardContent,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Coin from "./Coin";
import { Link } from "react-router-dom";
import { green, red } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  BuyCoin,
  SellCoin,
  AfterBuy,
  AfterSell,
  SETCOINS,
  SETBAL,
} from "../redux/actions/CoinActions";
import axios from "axios";

const useStyles = makeStyles({
  button: {
    margin: "10px !important",
  },
  cardPadding: {
    padding: 10,
  },
  link: {
    textDecoration: "none !important",
  },
  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    background: "white",
    boxShadow: 24,
    p: 4,
  },
  input: {
    margin: "10px",
  },
  colorOfChange: {
    color: (coin) => {
      if (coin.change > 0) {
        return green[800];
      } else {
        return red[500];
      }
    },
  },
});

const CoinCard = ({ coin, noBtn }) => {
  const dispatch = useDispatch();
  const [openBuy, setOpenBuy] = useState(false);
  const [openSell, setOpenSell] = useState(false);
  const [coinAvaliable, setAvaliable] = useState(false);
  const [sellcoin, setsellcoin] = useState({});
  const [amountofCoinBuy, setamountofCoinBuy] = useState(0);
  const [orderAmountBuy, setorderAmountBuy] = useState(0);
  const [amountofCoinSell, setamountofCoinSell] = useState(0);
  const [orderAmountSell, setorderAmountSell] = useState();
  const [err, setErr] = useState(false);
  const balance = useSelector((state) => state.Coins.Wallet.Balance);
  const coins = useSelector((state) => state.allCoins.coins);
  console.log(balance);
  const handleBuy = async () => {
    let orderDetails = {
      coinId: coin.uuid,
      tokenName: coin.name,
      iconUrl: coin.iconUrl,
      amountOfCoins: parseInt(amountofCoinBuy),
      buyingPrice: parseFloat(coin.price),
      orderAmount: parseFloat(orderAmountBuy),
      sellingPrice: 0,
    };
    let authToken = localStorage.getItem("authToken");
    let Buy = await axios.post(
      "https://crypto-learn-backend.onrender.com/api/coins/buyCoin",
      orderDetails,
      {
        headers: {
          authToken,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(Buy.data);
    let updateBal = await axios.put(
      "https://crypto-learn-backend.onrender.com/api/wallet/updateBalance/buy",
      { amount: orderAmountBuy },
      { headers: { authToken } }
    );
    console.log(updateBal.data);

    dispatch(BuyCoin(orderAmountBuy));
    dispatch(AfterBuy(orderDetails));
    fetchData();
    setorderAmountBuy(0);
    setOpenBuy(false);
  };
  const handleSell = async () => {
    let orderDetails = {
      coinId: coin.uuid,
      amountOfCoins: amountofCoinSell,
      orderAmount: orderAmountSell,
      sellingPrice: coin.price,
    };
    let authToken = localStorage.getItem("authToken");
    let Sell = await axios.post(
      "https://crypto-learn-backend.onrender.com/api/coins/sellCoin",
      orderDetails,
      {
        headers: {
          authToken,
          "Content-Type": "application/json",
        },
      }
    );

    let updateBal = await axios.put(
      "https://crypto-learn-backend.onrender.com/api/wallet/updateBalance/sell",
      { amount: orderAmountSell },
      { headers: { authToken } }
    );

    console.log(Sell.data, updateBal.data);
    dispatch(SellCoin(orderAmountSell));
    dispatch(AfterSell(orderDetails));
    fetchData();
    setorderAmountSell(0);
    setOpenSell(false);
  };
  const handleOpenBuy = () => {
    setOpenBuy(true);
  };
  const handleCloseBuy = () => {
    console.log(coins);
    setOpenBuy(false);
  };
  const handleOpenSell = () => {
    setOpenSell(true);
  };
  const handleCloseSell = () => {
    setOpenSell(false);
  };
  const handleAmountBuy = (e) => {
    setamountofCoinBuy(e.target.value);
    console.log(e.target.value);
  };
  const handleAmountSell = (e) => {
    setamountofCoinSell(e.target.value);
  };
  const fetchData = async () => {
    let authToken = localStorage.getItem("authToken");
    let coins = await axios.get(
      "https://crypto-learn-backend.onrender.com/api/coins/fetchAll",
      {
        headers: {
          authToken,
        },
      }
    );
    let bal = await axios.get(
      "https://crypto-learn-backend.onrender.com/api/wallet/getBalance",
      {
        headers: {
          authToken,
        },
      }
    );
    console.log(coins.data, bal.data);
    dispatch(SETCOINS(coins.data));
    dispatch(SETBAL(bal.data));
  };

  const fetchCoin = () => {
    if (coins.length === 0) {
      setAvaliable(false);
      setsellcoin({});
    }
    coins.map((token) => {
      console.log(token);
      if (token.coinId === coin.uuid) {
        setAvaliable(true);
        setsellcoin(token);
      }
    });
  };
  const classes = useStyles(coin);
  useEffect(() => {
    setorderAmountBuy(amountofCoinBuy * coin.price);
  }, [amountofCoinBuy]);
  useEffect(() => {
    check();
    setorderAmountSell(amountofCoinSell * coin.price);
  }, [amountofCoinSell]);

  const check = () => {
    if (amountofCoinSell <= sellcoin.amountOfCoins) {
      setErr(false);
    } else {
      setErr(true);
    }
  };
  const onClicksell = () => {
    setAvaliable(false);
    setsellcoin({});
    fetchCoin();
    handleOpenSell();
  };

  return (
    <div className={classes.cardPadding}>
      <Card
        sx={{ width: "250px" }}
        onClick={() => {
          <Coin uuid={coin.uuid} />;
        }}
      >
        <Link className={classes.link} to={`/coinById/${coin.uuid}`}>
          <CardHeader
            avatar={
              <Avatar
                src={`${coin.iconUrl}`}
                sx={{ width: 60, height: 60, marginLeft: 2 }}
                aria-label="recipe"
              ></Avatar>
            }
            titleTypographyProps={{
              variant: "h5",
              marginLeft: "0px",
              fontFamily: "Quicksand",
              fontWeight: "500",
            }}
            title={`${coin.name.slice(0, 20)}`}
          />
        </Link>
        <CardContent align="center">
          <Typography variant="h6" display="inline" color="text.secondary">
            Price :
            <Typography display="inline" variant="body1" color="text.secondary">
              &nbsp; &#36;{coin.price.slice(0, 9)}
            </Typography>
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Change:
            <Typography
              display="inline"
              variant="body1"
              className={classes.colorOfChange}
            >
              &nbsp; {coin.change}%
            </Typography>
          </Typography>
          {noBtn && (
            <>
              <Button
                variant="outlined"
                onClick={() => {
                  handleOpenBuy();
                }}
                className={classes.button}
              >
                Buy
              </Button>
              <Button variant="outlined" onClick={onClicksell}>
                Sell
              </Button>
            </>
          )}
        </CardContent>
      </Card>
      {/* Modal for Buying coin  */}
      <Modal open={openBuy} onClose={handleCloseBuy}>
        <Box className={classes.modalStyle}>
          <Card>
            <CardHeader
              avatar={<Avatar src={coin.iconUrl}></Avatar>}
              title={coin.tokenName}
              titleTypographyProps={{ fontSize: "22px" }}
            ></CardHeader>
            <hr />
            <CardContent>
              <Typography
                display={"inline-block"}
                marginRight={"70px"}
                padding={"5px"}
              >
                Buy {coin.name}
              </Typography>
              <Typography display={"inline-block"}>
                Wallet balance:{balance}
              </Typography>
              {balance <= 0 ? (
                <div style={{ fontSize: "12px", textAlign: "right" }}>
                  You balance is low You cant Buy
                </div>
              ) : (
                ""
              )}
              <TextField
                className={classes.input}
                variant="outlined"
                label="Current price"
                size="small"
                margin="dense"
                inputProps={{ readOnly: true }}
                helperText={`Current price of ${coin.name}`}
                fullWidth
                defaultValue={coin.price.slice(0, 10) + " " + "$"}
              ></TextField>
              <TextField
                fullWidth
                margin="dense"
                variant="outlined"
                placeholder="Enter the amount of coin "
                size="small"
                helperText="How much coins/Rs of coins you want "
                onChange={handleAmountBuy}
                autoComplete="false"
              ></TextField>
              <TextField
                margin="dense"
                fullWidth
                variant="outlined"
                placeholder="Your order"
                size="small"
                helperText={
                  orderAmountBuy > balance
                    ? "You dont have enough balance"
                    : "This much you are buying"
                }
                error={orderAmountBuy > balance ? true : false}
                value={orderAmountBuy}
              ></TextField>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleBuy}
                disabled={
                  orderAmountBuy > balance || balance < 0 ? true : false
                }
              >
                Confirm your order
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Modal>
      {/* Modal for selling coin */}
      {coinAvaliable ? (
        <Modal open={openSell} onClose={handleCloseSell}>
          <Box className={classes.modalStyle}>
            <Card>
              <CardHeader
                avatar={<Avatar src={coin.iconUrl}></Avatar>}
                title={coin.tokenName}
              ></CardHeader>
              <hr />
              <CardContent>
                <Typography
                  display={"inline-block"}
                  marginRight={"50px"}
                  padding={"5px"}
                >
                  Sell {coin.name}
                </Typography>
                <Typography display={"inline-block"}>
                  Coin balance:{sellcoin.amountOfCoins}
                </Typography>
                <TextField
                  className={classes.input}
                  variant="outlined"
                  label="Current price"
                  size="small"
                  margin="dense"
                  helperText={`Current price of ${coin.name}`}
                  fullWidth
                  defaultValue={coin.price.slice(0, 10) + " " + "$"}
                ></TextField>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  placeholder="Enter the amount of coin "
                  size="small"
                  helperText={
                    err
                      ? "You dont have much coins"
                      : "How much coins/Rs of coins you want "
                  }
                  onChange={handleAmountSell}
                  error={err}
                  autoComplete="false"
                ></TextField>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={handleSell}
                  disabled={err}
                >
                  Confirm your order
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Modal>
      ) : (
        <Modal open={openSell} onClose={handleCloseSell}>
          <Box className={classes.modalStyle}>
            <Card>
              <CardContent>
                <Typography>You dont have that token to sell</Typography>
              </CardContent>
            </Card>
          </Box>
        </Modal>
      )}
    </div>
  );
};
export default CoinCard;
