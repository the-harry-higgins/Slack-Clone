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
    margin: theme.spacing(2),
  },
  icon: {
    marginLeft: theme.spacing(1),
    color: theme.palette.grey[300],
  },
  text: {
    color: theme.palette.grey[300],
    whiteSpace: 'nowrap'
  }
}));

export default function Contact() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.text} >Harrison Higgins</Typography>
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
  );
}