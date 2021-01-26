import React from 'react';
import { Typography } from '@material-ui/core';

const AllDms = () => {
  return (
    <div>
      <div>
        <Typography variant='h4'>All direct messages</Typography>
      </div>
      <div>
        
      </div>
      <label for="search">To</label>
      <input type="text" id="search"></input>
    </div>
  )
}

export default AllDms;