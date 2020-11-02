import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from '@material-ui/core';
import { sendMessage } from '../store/actions/socket';

const TinyMCEForm = () => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleEditorChange = (e) => {
    setContent(e.target.getContent());
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(sendMessage(content));
    setContent('');
  }

  return (
    <form onSubmit={handleSubmit} >
      <Editor
        apiKey="nvcfuefltcipwz13vzff2sr22yrb1nmqon4d7reuf96c0a2y"
        init={{
          height: 100,
          menubar: false,
          selector: 'textarea',
          plugins: 'autolink autoresize codesample help link lists preview wordcount',
          toolbar: 'bold | italic | codesample | link | bullist | numlist | outdent | indent | preview | help ',
          link_default_protocol: 'https'
        }}
        onChange={handleEditorChange}
        value={content}
      />
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

export default TinyMCEForm;