import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, List, ListItem } from '@material-ui/core';
import { NavLink, useHistory } from 'react-router-dom';
import { baseAPIUrl } from "../config";
import { makeStyles } from '@material-ui/core/styles';
import { createDmChannelThunk } from '../store/actions/directMessages';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    paddingBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.primary.light}`,
  },
  searchDiv: {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.primary.light}`,
  },
  searchBar: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    width: '100%',
  },
  channelsContainer: {
    overflow: 'scroll'
  },
  channel: {
    display: 'flex',
    padding: theme.spacing(2),
    width: '100%',
    justifyContent: 'space-between'
  }
}));


const AllDms = () => {

  const classes = useStyles();

  const [dmPreviews, setDmPreviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const token = useSelector((state) => state.authentication.token);
  const currentuser = useSelector((state) => state.currentuser);
  const directMessages = useSelector((state) => state.directMessages);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${baseAPIUrl}/directMessages/all/users/${currentuser.id}/`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
      const dms = await response.json();
      setDmPreviews(dms);
    }
    fetchData();
  }, [token, directMessages]);

  const search = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const fetchUsers = async (term) => {
      const response = await fetch(
        `${baseAPIUrl}/users/matching/${term}/`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`
          },
        });

      const users = await response.json();

      setUsers(users);
    }

    if (term.length) {
      fetchUsers(term);
    }
  }

  const handleDirectMessage = (user) => () => {
    // does user exist in a channel already
    let dm;
    for (let id of directMessages.ids) {
      if (directMessages.dict[id].otherUser.displayName === user.displayName) {
        dm = directMessages.dict[id];
        break;
      }
    }
    console.log('handleDirectMessage', dm);

    if (dm) {
      history.push(`/channels/${dm.id}`);
    } else {
      (async (user) => {
        const dm = await dispatch(createDmChannelThunk(user));
        history.push(`/channels/${dm.id}`);
      })(user);
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography variant='h6'>All direct messages</Typography>
      </div>
      <div className={classes.searchDiv}>
        <label>To:</label>
        <input type="text" value={searchTerm} onChange={search}
          placeholder="Type the name of a person"
          className={classes.searchBar}
        />
        {users.length ?
          users.map(user => (
            <ListItem
              button
              onClick={handleDirectMessage(user)}
              component='div'
              key={`${user.id}`}
              className={classes.channel}
            >
              <div>{user.displayName}</div>
            </ListItem>
          )) :
          null
        }
      </div>
      <List component="div" className={classes.channelsContainer}>
        {dmPreviews.length ?
          dmPreviews.map(dm => (
            <ListItem
              button
              component={NavLink}
              to={`/channels/${dm.id}`}
              key={`${dm.id}`}
              className={classes.channel}
              divider
            >
              <div>
                <div>
                  {dm.otherUser.displayName}
                </div>
                <div>
                  {dm.lastMessage ?
                    dm.lastMessage.content :
                    null
                  }
                </div>
              </div>
            </ListItem>
          )) :
          null
        }
      </List>
    </div>
  )
}

export default AllDms;