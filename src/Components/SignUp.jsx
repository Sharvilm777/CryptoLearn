import { Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useState } from "react";
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
const SignUp = () => {
  let style = useStyles();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePass = (e) => {
    setPass(e.target.value);
  };
  const handleSignup = async () => {
    let SignupUser = await axios.post(
      "https://crypto-learn-backend.onrender.com/api/auth/signup",
      {
        name,
        email,
        password: pass,
      }
    );
    console.log(SignupUser.data);
  };

  return (
    <div className={style.centering}>
      <TextField
        id="name"
        className={style.emailBox}
        variant="outlined"
        label="Enter your Name"
        margin="dense"
        onChange={onChangeName}
      ></TextField>
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
        onClick={handleSignup}
        variant="outlined"
      >
        Sign Up
      </Button>
    </div>
  );
};

export default SignUp;
