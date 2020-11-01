import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {Container, List } from '@material-ui/core';
import { getMessages } from '../store/actions/messages';
import { updateCurrentChannel } from '../store/actions/currentchannel';
import MessageCard from './MessageCard';
import TinyMCEForm from './TinyMCEForm';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  messageList: {
    height: '400px',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto'
  },
  anchor: {
    height: '0px'
  }
}));

export default function ChannelFeed() {
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
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Container className={classes.root}>
      <h1>{currentchannel.name}</h1>
      <List className={classes.messageList}>
        {messages.map(message => {
          return (
            <MessageCard
              key={message.id}
              id={message.id}
              displayName={message.displayName}
              profileImage={message.profileImage}
              sent={message.createdAt} 
              content={message.content}
            />
          );
        })
        }
        <div ref={anchorRef} className={classes.anchor}/>
      </List>
      <TinyMCEForm />
    </Container>
  );
}