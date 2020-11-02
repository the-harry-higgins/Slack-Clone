import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import io from "socket.io-client";

import App from './components/App';
import configureStore from './store/configureStore';
import { baseUrl } from "./config";

// create a new connection to the socket
const socket = io.connect(baseUrl);

socket.on('error', (error) => {
  console.error(error);
});

const store = configureStore({ socket });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
