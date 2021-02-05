import React from 'react';
import { Avatar, Typography, ListItemAvatar, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start'
  },
  displayName: {
    marginRight: '0.5rem',
    fontWeight: 'bold'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
}));

export default function MessageCard({id, displayName, profileImage, sent, content}) {
  const classes = useStyles();

  const date = moment(sent).calendar();

  return (
    <ListItem className={classes.root} key={`listitem-${id}`}>
      <ListItemAvatar key={`listitemavatar-${id}`}>
        <Avatar key={`avatar-${id}`} alt={displayName} 
        // src={profileImage}
        />
      </ListItemAvatar>
      <div key={`column-${id}`} className={classes.column}>
        <ListItemText
          key={`listitemtext-${id}`}
          primary={
            <>
              <Typography
                key={`displayName-${id}`}
                className={classes.displayName}
                component="span"
                variant="subtitle1"
              >
                {displayName}
              </Typography>
              <Typography
                key={`date-${id}`}
                component="span"
                variant="subtitle2"
                color='textSecondary'
              >
                {date}
              </Typography>
            </>
          }
          />
        <div key={`content-${id}`} dangerouslySetInnerHTML={{__html: content}} />
      </div>
    </ListItem>
  );
}