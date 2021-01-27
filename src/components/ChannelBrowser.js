import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, List, ListItem } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { baseAPIUrl } from "../config";
import { makeStyles } from '@material-ui/core/styles';
import { joinChannelThunk } from '../store/actions/channels';


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

const ChannelBrowser = () => {
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
        {matchingChannels.map(channel => (
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
              <div>
                Joined
              </div> :
              <button onClick={handleJoin(channel)}>Join</button>
            }
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default ChannelBrowser;