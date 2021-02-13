import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppRouter from './components/AppRouter';
import configureStore from './store/configureStore';
import socket from './socket';

import './index.css';

const store = configureStore({ socket });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
