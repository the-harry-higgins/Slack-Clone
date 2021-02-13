import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { Typography, List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { baseAPIUrl } from "../../config";
import { createDmChannelThunk } from '../../store/actions/directMessages';
import removeHTMLTags from '../../utils/removeHTMLTags';
import MessageCard from '../MessageCard/MessageCard';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.primary.light}`,
    borderRadius: 5,
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


const AllDMsPage = () => {

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
        `${baseAPIUrl}/directMessages/`,
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
  }, [token, directMessages, currentuser.id]);

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
        <label><Typography>To:</Typography></label>
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
              <div>
                <Typography variant="body2">{user.displayName}</Typography>
              </div>
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
                <MessageCard
                  id={dm.otherUser.id}
                  displayName={dm.otherUser.displayName}
                  profileImage={null}
                  sent={dm.lastMessage ? dm.lastMessage.createdAt : dm.createdAt}
                  content={dm.lastMessage ?
                    `${dm.lastMessage.User.displayName}: ${removeHTMLTags(dm.lastMessage.content)}` :
                    'Send the first message!'}
                />
              </div>
            </ListItem>
          )) :
          null
        }
      </List>
    </div>
  )
}

export default AllDMsPage;