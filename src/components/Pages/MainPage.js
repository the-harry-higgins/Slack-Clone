import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core'
import { Switch, Route, Redirect } from 'react-router-dom';

import Nav from '../Nav/Nav';
import SidebarDrawer from '../Sidebar/SidebarDrawer';
import FeedPage from './FeedPage';
import ChannelBrowserPage from './ChannelBrowserPage';
import AllDMsPage from './AllDMsPage';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

const MainPage = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box display='flex'>
      <Nav handleDrawerToggle={handleDrawerToggle}/>
      <SidebarDrawer handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen}/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route
            exact={true}
            path="/channels/:id"
            render={(props) => <FeedPage {...props} />}
          />
          <Route exact={true} path="/browse-channels">
            <ChannelBrowserPage/>
          </Route>
          <Route exact={true} path="/all-dms">
            <AllDMsPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Box>
  );
}

export default MainPage;