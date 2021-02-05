import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Typography, List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { baseAPIUrl } from "../../config";
import {
  joinChannelThunk, leaveChannelThunk, deleteChannelThunk, createChannelThunk
} from '../../store/actions/channels';


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

const ChannelBrowserPage = () => {
  const classes = useStyles();

  const [allChannels, setAllChannels] = useState([]);
  const [matchingChannels, setMatchingChannels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const token = useSelector((state) => state.authentication.token);
  const channels = useSelector((state) => state.channels);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${baseAPIUrl}/channels/`, {
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
      });
      const { channels } = await response.json();
      setAllChannels(channels);
      setMatchingChannels(channels);
    }
    fetchData();
  }, [token, channels]);

  const search = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    if (term.length === 0) {
      setMatchingChannels(allChannels);
    } else {
      const newMatchingChannels = allChannels.filter(channel => {
        return channel.name.toLowerCase().includes(term);
      });
      setMatchingChannels(newMatchingChannels);
    }
  }

  const handleJoin = (channel) => (event) => {
    event.preventDefault();
    dispatch(joinChannelThunk(channel));
  }

  const handleLeave = (channel) => (event) => {
    event.preventDefault();
    dispatch(leaveChannelThunk(channel));
  }

  const handleCreate = (channelName) => (event) => {
    event.preventDefault();
    dispatch(createChannelThunk(channelName));
  }

  const handleDelete = (channel) => (event) => {
    event.preventDefault();
    dispatch(deleteChannelThunk(channel));
  }

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography variant='h6'>Channel browser</Typography>
      </div>
      <div className={classes.searchDiv}>
        <input type="text" value={searchTerm} onChange={search} className={classes.searchBar} />
        <Typography>{matchingChannels.length} channels</Typography>
      </div>
      <List component="div" className={classes.channelsContainer}>
        {matchingChannels.length ?
          matchingChannels.map(channel => (
            <ListItem
              button
              component={NavLink}
              to={`/channels/${channel.id}`}
              key={`${channel.name}`}
              className={classes.channel}
              divider
            >
              <div>
                <div>
                  {channel.name}
                </div>
                <div>
                  {channel.members} members
              </div>
              </div>
              {channels.ids.includes(channel.id) ?
                <button onClick={handleLeave(channel)}>Leave</button> :
                <button onClick={handleJoin(channel)}>Join</button>
              }
              <button onClick={handleDelete(channel)}>Delete</button>
            </ListItem>
          )) :
          <ListItem component='div'>
            <Typography>Create a new {searchTerm} channel?</Typography>
            <button onClick={handleCreate(searchTerm)}>Create</button>
          </ListItem>
        }
      </List>
    </div>
  )
}

export default ChannelBrowserPage;