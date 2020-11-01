export const SET_SOCKET = 'slack-clone/socket/SET_SOCKET';

export const setSocket = socket => ({ type: SET_SOCKET, socket });

export const setupListeners = () => async (dispatch, getState) => {
  const { channels, socket } = getState();
  console.log('Setting up listeners', channels.ids);
  console.log(socket);
  socket.emit('join rooms', channels.ids);
  channels.ids.forEach(id => {
    socket.on(id, ({ user, message }) => {
      console.log(`Recieved new message for channel ${id}: ${message} -- ${user.displayName}` );
      // If the current channel doesn't match the
      // channel the message belongs to, then
      // don't add the message because it shouldn't
      // display
      // dispatch(addMessage(message));
    });
  });
}

export const addMessage = (message) => async (dispatch, getState) => {
  const { currentchannel } = getState();
  console.log('Adding Message', currentchannel, message);
  if (currentchannel.id === message.channelId) {
    // Add message to messages
  } else {
    // Set notification setting on the channel
  }
}

export const sendMessage = (message) => async (dispatch, getState) => {
  const { currentchannel, currentuser, socket } = getState();
  console.log('Sending Message', currentchannel, message, currentuser);
  socket.emit(currentchannel.id, { user: currentuser, message });
}