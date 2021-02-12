import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import sloth from './sloth.png';
import { makeStyles } from '@material-ui/core/styles';

import CurrentUser from './CurrentUser';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: "none",
    borderBottom: `1px solid ${theme.palette.primary.light}`,
  },
  toolbar: {
    justifyContent: 'space-between',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    width: 40,
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 600,
    marginLeft: theme.spacing(1)
  }
}));

const Nav = ({ handleDrawerToggle }) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <div className={classes.logoContainer}>
          <img src={sloth} alt='Sloth Logo' className={classes.logo} />
          <Typography noWrap className={classes.title}>
            Sloth
          </Typography>
        </div>
        <CurrentUser />
      </Toolbar>
    </AppBar>
  );
}

export default Nav;