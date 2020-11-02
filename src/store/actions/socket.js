import { addMessage } from './messages';
import { setChannelNotification } from './channels';

export const SET_SOCKET = 'slack-clone/socket/SET_SOCKET';

export const setSocket = socket => ({ type: SET_SOCKET, socket });

export const setupListeners = () => async (dispatch, getState) => {
  const { channels, socket } = getState();
  socket.emit('join rooms', channels.ids);
  channels.ids.forEach(id => {
    socket.on(id, (message) => {
      dispatch(handleNewMessage(message, id));
    });
  });
}

export const handleNewMessage = (message, id) => async (dispatch, getState) => {
  const { currentchannel } = getState();
  if (currentchannel.id === id) {
    // Add message to messages
    dispatch(addMessage(message));
  } else {
    // Set notification setting on the channel
    dispatch(setChannelNotification(id));
  }
}

export const sendMessage = (message) => async (dispatch, getState) => {
  const { currentchannel, currentuser, socket } = getState();
  socket.emit(currentchannel.id, { user: currentuser, message });
}