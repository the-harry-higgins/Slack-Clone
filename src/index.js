import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import io from "socket.io-client";

import AppRouter from './components/AppRouter';
import configureStore from './store/configureStore';
import { baseUrl } from "./config";

import './index.css';

// create a new connection to the socket
const socket = io.connect(baseUrl);

socket.on('error', (error) => {
  console.error(error);
});

socket.on('connect', () => {
  console.log(`${socket.id} connected`);
});

socket.on('disconnect', () => {
  console.log(`${socket.id} disconnected`);
});

const store = configureStore({ socket });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
