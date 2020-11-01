import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { sendMessage } from '../store/actions/socket';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'column',
    // alignItems: 'center',
    width: '100%'
  },
  editor: {
    flexGrow: '1'
  },
  submit: {
    flexGrow: '0'
  }
}));

const TinyMCEForm = () => {
  const classes = useStyles();
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleEditorChange = (e) => {
    setContent(e.target.getContent());
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Submitted:', content);
    dispatch(sendMessage(content));
    setContent('');
  }

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Editor
        className={classes.editor}
        apiKey="nvcfuefltcipwz13vzff2sr22yrb1nmqon4d7reuf96c0a2y"
        init={{
          height: 100,
          menubar: false,
          plugins: 'autolink codesample help link lists preview wordcount',
          toolbar:
            'bold | italic | codesample | link |\
              bullist | numlist | outdent | indent | preview | help ',
          link_default_protocol: 'https'
        }}
        onChange={handleEditorChange}
        value={content}
      />
      <Button className={classes.submit} variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
}

export default TinyMCEForm;