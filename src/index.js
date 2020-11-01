import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './components/App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import { baseUrl } from "./config";

import io from "socket.io-client";

// create a new connection to the socket
const socket = io.connect(baseUrl);

socket.on('error', (error) => {
  console.error(error);
});

const store = configureStore({ socket });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline>
        <App/>
      </CssBaseline>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
