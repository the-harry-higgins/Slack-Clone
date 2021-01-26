import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { sendMessage } from '../store/actions/socket';

const MessageForm = () => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const updateBody = (content) => {
    setContent(content);
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(sendMessage(content));
    setContent('');
  }

  return (
    <form onSubmit={handleSubmit} >
      <ReactQuill value={content} onChange={updateBody}></ReactQuill>
      <Button 
        bgcolor="primary.main"
        color="primary"
        variant="contained"
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
}

export default MessageForm;