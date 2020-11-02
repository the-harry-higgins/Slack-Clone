import React from 'react';
import ReactDOM from 'react-dom';
import io from "socket.io-client";
import { Provider } from 'react-redux';

import {CssBaseline, ThemeProvider} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';

import App from './components/App';
import configureStore from './store/configureStore';
import { baseUrl } from "./config";

// create a new connection to the socket
const socket = io.connect(baseUrl);

socket.on('error', (error) => {
  console.error(error);
});

const store = configureStore({ socket });

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#613659',
      contrastText: '#f8f8ff',
    },
    secondary: {
      main: '#211522',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#D3B1C2',
    },
    contrastThreshold: 3,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline>
        <ThemeProvider theme={theme}>
          <App/>
        </ThemeProvider>
      </CssBaseline>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
