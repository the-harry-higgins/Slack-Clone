import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';

const ChannelBrowser = () => {
  const [allChannels, setAllChannels] = useState([]);

  useEffect(() => {
    // const data = await fetch('')
    const data = ['channel1', 'channel2', 'channel3', 'channel4', 'channel5',];
    setAllChannels(data);
  }, []);

  return (
    <div>
      <div>
        <Typography variant='h4'>Channel browser</Typography>
      </div>
      <div>
        <label for="search">Search</label>
        <input type="text" id="search"></input>
        <Typography>{allChannels.length} channels</Typography>
      </div>
      <div>
        {allChannels.map(channel => (
          <div>
            {channel}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChannelBrowser;