import React from 'react';
import { Avatar, Typography, ListItemAvatar, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  displayName: {
    marginRight: '0.5rem',
    fontWeight: 'bold'
  }
}));

export default function MessageCard({id, displayName, profileImage, sent, content}) {
  const classes = useStyles();

  const date = moment(sent).format('hh:mm:ss');

  return (
    <ListItem className={classes.root} key={id}>
      <ListItemAvatar>
        <Avatar alt={displayName} src={profileImage}/>
      </ListItemAvatar>
      <ListItemText
        primary={
          <React.Fragment>
            <Typography
            className={classes.displayName}
              component="span"
              variant="subtitle1"
            >
              {displayName}
            </Typography>
            <Typography
              component="span"
              variant="subtitle2"
            >
              {date}
            </Typography>
          </React.Fragment>
        }
        secondary={content} />
    </ListItem>
  );
}