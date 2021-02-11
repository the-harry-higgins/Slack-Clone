import React from 'react';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Collapse, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ForumIcon from '@material-ui/icons/Forum';
import SearchIcon from '@material-ui/icons/Search';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.grey[300]
  },
  default: {
    color: theme.palette.grey[300]
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  notify: {
    color: theme.palette.primary.contrastText,
    fontWeight: 900
  },
  selected: {
    backgroundColor: theme.palette.secondary.main
  },
  channelContainer: {
    display: 'flex'
  },
  notifyIcon: {
    color: '#f75145',
    paddingRight: theme.spacing(1)
  }
}));

const SideBar = () => {
  const channels = useSelector((state) => state.channels);
  const directMessages = useSelector((state) => state.directMessages);
  const classes = useStyles();
  const [openChannels, setOpenChannels] = React.useState(true);
  const [openDms, setOpenDms] = React.useState(true);

  const handleChannelsClick = () => {
    setOpenChannels(!openChannels);
  };

  const handleDmsClick = () => {
    setOpenDms(!openDms);
  };

  return (
    <>
      <List className={classes.root}>
        <ListItem
          button
          component={NavLink}
          to={`/all-dms`}
        >
          <ListItemIcon>
            <SearchIcon className={classes.default} />
          </ListItemIcon>
          <Typography>All DMs</Typography>
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to={`/browse-channels`}
        >
          <ListItemIcon>
            <ForumIcon className={classes.default} />
          </ListItemIcon>
          <Typography>Channel browser</Typography>
        </ListItem>

        <ListItem button onClick={handleChannelsClick}>
          <ListItemIcon>
            {openChannels ?
              <ExpandLess className={classes.default} /> :
              <ExpandMore className={classes.default} />
            }
          </ListItemIcon>
          <ListItemText primary="Channels" />
        </ListItem>
        <Collapse in={openChannels} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {channels.ids ?
              channels.ids.map((id, index) => (
                <ListItem
                  button
                  component={NavLink}
                  to={`/channels/${id}`}
                  key={index}
                  className={classes.nested}
                  activeClassName={classes.selected}
                  divider
                >
                  <div className={classes.channelContainer}>
                    {channels.dict[id].notification ?
                      <>
                        <Brightness1Icon fontSize='small' className={classes.notifyIcon}/>
                        <Typography className={classes.notify}>
                          {`# ${channels.dict[id].name}`}
                        </Typography>
                      </> :
                      <Typography >
                        {`# ${channels.dict[id].name}`}
                      </Typography>
                    }
                  </div>
                </ListItem>
              )) :
              null
            }
          </List>
        </Collapse>

        <ListItem button onClick={handleDmsClick}>
          <ListItemIcon>
            {openDms ?
              <ExpandLess className={classes.default} /> :
              <ExpandMore className={classes.default} />
            }
          </ListItemIcon>
          <ListItemText primary="Direct messages" />
        </ListItem>
        <Collapse in={openDms} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {directMessages.ids ?
              directMessages.ids.map((id, index) => (
                <ListItem
                  button
                  component={NavLink}
                  to={`/channels/${id}`}
                  key={index}
                  className={classes.nested}
                  activeClassName={classes.selected}
                  divider
                >
                  <div className={classes.channelContainer}>
                    {directMessages.dict[id].notification ?
                      <>
                        <Brightness1Icon fontSize='small' className={classes.notifyIcon} />
                        <Typography className={classes.notify}>
                          {`${directMessages.dict[id].otherUser.displayName}`}
                        </Typography>
                      </> :
                      <Typography >
                        {`${directMessages.dict[id].otherUser.displayName}`}
                      </Typography>
                    }
                  </div>
                </ListItem>
              )) :
              null
            }
          </List>
        </Collapse>
      </List>
    </>
  );
}

export default SideBar;