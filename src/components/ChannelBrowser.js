import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import { baseAPIUrl } from "../config";


const ChannelBrowser = () => {
  const [allChannels, setAllChannels] = useState([]);
  const [matchingChannels, setMatchingChannels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const token = useSelector((state) => state.authentication.token);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${baseAPIUrl}/channels/`, {
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
      });
      const { channels } = await response.json();
      console.log(channels);
      setAllChannels(channels);
      setMatchingChannels(channels);
    }
    fetchData();
  }, [token]);

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

  return (
    <div>
      <div>
        <Typography variant='h4'>Channel browser</Typography>
      </div>
      <div>
        <label>
          Search
          <input type="text" value={searchTerm} onChange={search}/>
        </label>
        <Typography>{matchingChannels.length} channels</Typography>
      </div>
      <div>
        {matchingChannels.map(channel => (
          <div>
            {channel.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChannelBrowser;