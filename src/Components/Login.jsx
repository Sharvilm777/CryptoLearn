import { Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(() => ({
  centering: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  emailBox: {
    width: "80%",
  },
  buttonStyle: {
    float: "left",
  },
}));

const Login = () => {
  let style = useStyles();
  const [Email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const handleLogin = async () => {
    let loginData = await axios.post(
      "https://crypto-learn-backend.onrender.com/api/auth/login",
      {
        email: Email,
        password: password,
      }
    );
    localStorage.setItem("authToken", loginData.data.authToken);
    toast("Login successfull");
    const toastDuration = 3000;

    setTimeout(() => {
      navigate("/");
    }, toastDuration);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePass = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className={style.centering}>
      <ToastContainer />
      <TextField
        id="email"
        className={style.emailBox}
        variant="outlined"
        label="Enter your Email"
        margin="dense"
        onChange={onChangeEmail}
      ></TextField>

      <TextField
        id="password"
        className={style.emailBox}
        variant="outlined"
        label="Password"
        margin="dense"
        type={"password"}
        onChange={onChangePass}
      ></TextField>
      <Button
        className={style.buttonStyle}
        onClick={handleLogin}
        variant="outlined"
      >
        Login
      </Button>
    </div>
  );
};

export default Login;
