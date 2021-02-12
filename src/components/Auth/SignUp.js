import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Button, Grid, Link, TextField } from '@material-ui/core';

import useStyles from './AuthStyles';
import { signUp } from '../../store/actions/authentication';
import Auth from './Auth';


export default function SignUp() {
  const classes = useStyles();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signUp(displayName, email, password));
  };

  const updateDisplayName = (e) => {
    setDisplayName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Auth title="Sign Up">
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          autoComplete="fname"
          name="displayName"
          variant="outlined"
          required
          fullWidth
          id="displayName"
          label="Display Name"
          autoFocus
          margin="normal"
          value={displayName}
          onChange={updateDisplayName}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          type="email"
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
          Sign Up
          </Button>
        <Grid container justify="center">
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
              </Link>
          </Grid>
        </Grid>
      </form>
    </Auth>
  );
}
