import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Button, Grid, Link, TextField } from '@material-ui/core';

import { login } from "../../store/actions/authentication";
import useStyles from './AuthStyles';
import Auth from './Auth';


const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("demouser@demo.com");
  const [password, setPassword] = useState("password");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };


  return (
    <Auth title="Sign In">
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          type="text"
          value={email}
          onChange={updateEmail}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={updatePassword}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
          </Button>
        <Grid container justify="center">
          <Grid item>
            <Link href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </Auth>
  );
};

export default Login;
