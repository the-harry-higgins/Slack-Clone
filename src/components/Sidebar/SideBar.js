import React from 'react';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Collapse, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ForumIcon from '@material-ui/icons/Forum';
import SearchIcon from '@material-ui/icons/Search';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.grey[300]
  },
  folder: {
    color: theme.palette.primary.contrastText
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
            <SearchIcon className={classes.folder} />
          </ListItemIcon>
          <Typography>All DMs</Typography>
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to={`/browse-channels`}
        >
          <ListItemIcon>
            <ForumIcon className={classes.folder} />
          </ListItemIcon>
          <Typography>Channel browser</Typography>
        </ListItem>

        <ListItem button onClick={handleChannelsClick}>
          <ListItemIcon>
            {openChannels ?
              <ExpandLess className={classes.folder} /> :
              <ExpandMore className={classes.folder} />
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
                  <Typography className={channels.dict[id].notification ? classes.notify : ''}>
                    {`# ${channels.dict[id].name}`}
                  </Typography>
                </ListItem>
              )) :
              null
            }
          </List>
        </Collapse>

        <ListItem button onClick={handleDmsClick}>
          <ListItemIcon>
            {openDms ?
              <ExpandLess className={classes.folder} /> :
              <ExpandMore className={classes.folder} />
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
                  <Typography className={directMessages.dict[id].notification ? classes.notify : ''}>
                    {`${directMessages.dict[id].otherUser.displayName}`}
                  </Typography>
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