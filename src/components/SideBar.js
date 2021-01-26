import React from 'react';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ForumIcon from '@material-ui/icons/Forum';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { NavLink } from 'react-router-dom';
import { Typography } from '@material-ui/core';

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
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  if (Object.keys(channels).length === 0) return null;

  return (
    <>
      <List className={classes.root}>
        <ListItem
          button
          component={NavLink}
          to={`/all-dms`}
        >
          <Typography>All DMs</Typography>
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to={`/browse-channels`}
        >
          <Typography>Channel browser</Typography>
        </ListItem>
        <ListItem button onClick={handleClick}>
          {open ? <ExpandLess /> : <ExpandMore />}
          <ListItemIcon>
            <ForumIcon className={classes.folder} />
          </ListItemIcon>
          <ListItemText primary="Channels" />
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {channels.ids.map((id, index) => (
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
            ))}
          </List>
        </Collapse>
      </List>
    </>
  );
}

export default SideBar;