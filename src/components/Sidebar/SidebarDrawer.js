import React from 'react';
import { Drawer, Hidden } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import SideBar from './SideBar';
import Contact from './Contact';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.main,
  },
  drawerContents: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));


const SidebarDrawer = ({ handleDrawerToggle, mobileOpen }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div className={classes.drawerContents}>
            <SideBar />
            <Contact />
          </div>
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <div className={classes.toolbar} />
          <div className={classes.drawerContents}>
            <SideBar />
            <Contact />
          </div>
        </Drawer>
      </Hidden>
    </nav>
  );
}

export default SidebarDrawer;
