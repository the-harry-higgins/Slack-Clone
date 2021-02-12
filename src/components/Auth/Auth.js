import React from "react";
import { Box, Container, Typography } from '@material-ui/core';

import Copyright from './Copyright';
import useStyles from './AuthStyles';
import sloth from '../Nav/sloth.png';


const Auth = (props) => {
  const classes = useStyles();
  
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <div className={classes.logoContainer}>
          <img src={sloth} alt='Sloth Logo' className={classes.logo} />
          <Typography noWrap className={classes.title}>
            Sloth
          </Typography>
        </div>
        <Typography className={classes.quote}>
          A Slack clone
        </Typography>
        <Typography component="h2" variant="h5">
          { props.title }
        </Typography>
        { props.children }
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Auth;
