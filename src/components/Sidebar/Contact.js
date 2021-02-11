import React from "react";
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import PortraitIcon from '@material-ui/icons/Portrait';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    margin: theme.spacing(3),
  },
  icons: {
    // display: 'flex',
    // flexWrap: 'wrap',
    // justifyContent: 'space-between',
    color: theme.palette.grey[300],
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  icon: {
    marginRight: theme.spacing(4),
    color: theme.palette.grey[300],
    width: 30
  },
  text: {
    color: theme.palette.grey[300],
  }
}));

export default function Contact() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant='h6' className={classes.text} >Harrison Higgins</Typography>
      <div className={classes.icons}>
        <Tooltip title="Harrison's Portfolio" arrow>
          <PortraitIcon className={classes.icon} onClick={() => window.open('https://the-harry-higgins.github.io/portfolio/')} />
        </Tooltip>
        <Tooltip title="Harrison's GitHub" arrow>
          <GitHubIcon className={classes.icon} onClick={() => window.open('https://github.com/the-harry-higgins')} />
        </Tooltip>
        <Tooltip title="Harrison's LinkedIn" arrow>
          <LinkedInIcon className={classes.icon} onClick={() => window.open('https://www.linkedin.com/in/harry-higgins-82a8661bb/')} />
        </Tooltip>
      </div>
      <Typography className={classes.text}>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
      </Typography>
    </div>
  );
}