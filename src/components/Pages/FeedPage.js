import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import { Container, Divider, List, Typography } from '@material-ui/core';

import { getMessages } from '../../store/actions/messages';
import { updateCurrentChannel } from '../../store/actions/currentchannel';
import { setChannelNotification } from '../../store/actions/channels';
import MessageCard from '../MessageCard/MessageCard';
import MessageForm from '../MessageForm/MessageForm';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: `calc(100vh - 112px)`,
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.primary.light}`,
    borderRadius: 5,
  },
  messageList: {
    height: 'calc(100% - 174px)',
    width: '100%',
    boxSizing: 'border-box',
    overflow: 'auto',
    marginTop: theme.spacing(2),
  },
  anchor: {
    height: '0px'
  }
}));

export default function FeedPage() {
  const classes = useStyles();
  const { id } = useParams();
  const currentchannel = useSelector(state => state.currentchannel);
  const messages = useSelector(state => state.messages);
  const dispatch = useDispatch();
  const anchorRef = useRef(null);
  const scrollToBottom = () => {
    anchorRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    dispatch(updateCurrentChannel(id));
    dispatch(getMessages(id));
    if (currentchannel.notification) {
      dispatch(setChannelNotification(id))
    }
  }, [id, currentchannel.notification, dispatch]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Container className={classes.root}>
      {currentchannel.type === 'directmessage' ?
        <Typography variant='h6'>{currentchannel.otherUser.displayName}</Typography> :
        <Typography variant='h6'>{currentchannel.name}</Typography>
      }
      <List className={classes.messageList}>
        {messages.map(message => {
          return (
            <React.Fragment key={`fragment-${message.id}`}>
              <Divider key={`divider-${message.id}`} />
              <MessageCard
                key={message.id}
                id={message.id}
                displayName={message.displayName}
                profileImage={message.profileImage}
                sent={message.createdAt}
                content={message.content}
              />
            </React.Fragment>
          );
        })
        }
        <div ref={anchorRef} className={classes.anchor} />
      </List>
      <MessageForm />
    </Container>
  );
}