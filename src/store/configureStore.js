import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import authentication from "./reducers/authentication";
import currentuser from "./reducers/currentuser";
import channels from "./reducers/channels";
import directMessages from "./reducers/directMessages";
import theme from "./reducers/theme";
import messages from "./reducers/messages";
import currentchannel from "./reducers/currentchannel";
import socket from './reducers/socket';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  authentication,
  currentuser,
  channels,
  directMessages,
  theme,
  currentchannel,
  messages,
  socket
});

const configureStore = (initialState) => {
  return createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
};

export default configureStore;
