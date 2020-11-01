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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
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
      <List>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <ForumIcon />
          </ListItemIcon>
          <ListItemText primary="Channels" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {channels.ids.map((id, index) => (
                <ListItem button component={NavLink} to={`/channels/${id}`} key={index} className={classes.nested}>
                  <ListItemText primary={`# ${channels.dict[id].name}`} />
                </ListItem>
              ))}
            </List>
          </Collapse>   
      </List>
    </>
  );
}

export default SideBar;