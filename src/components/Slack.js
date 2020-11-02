import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core'
import { Switch, Route, Redirect } from 'react-router-dom';

import Nav from './Nav';
import ResponsiveDrawer from './ResponsiveDrawer';
import ChannelFeed from './ChannelFeed';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

function Slack(props) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box display='flex'>
      <Nav handleDrawerToggle={handleDrawerToggle}/>
      <ResponsiveDrawer handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen}/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route
            exact={true}
            path="/channels/:id"
            render={(props) => <ChannelFeed {...props} />}
          />
          <Redirect to="/" />
        </Switch>
      </main>
    </Box>
  );
}

export default Slack;