import { handleNewMessage } from './messages';
import { addDmChannel } from './directMessages';

export const SET_SOCKET = 'slack-clone/socket/SET_SOCKET';

export const setSocket = socket => ({ type: SET_SOCKET, socket });

export const setupListeners = () => async (dispatch, getState) => {
  const { channels, directMessages, socket, currentuser } = getState();

  socket.emit('join personal room', currentuser.id);

  socket.on(`new dm channel`, dmChannel => {
    dispatch(addDmChannel(dmChannel));
    dispatch(addListenerForChannel(dmChannel));
  })

  socket.emit('join rooms', [...channels.ids, ...directMessages.ids]);

  channels.ids.forEach(id => {
    socket.on(id, (message) => {
      dispatch(handleNewMessage(message, id));
    });
  });

  directMessages.ids.forEach(id => {
    socket.on(id, (message) => {
      dispatch(handleNewMessage(message, id));
    });
  });

}

export const addListenerForChannel = (channel) => async(dispatch, getState) => {
  const { socket } = getState();
  socket.emit('join rooms', [channel.id]);
  socket.on(channel.id, (message) => {
    dispatch(handleNewMessage(message, channel.id));
  });
}


export const removeListenerForChannel = (channel) => async (dispatch, getState) => {
  // const { socket } = getState();
  // socket.emit('join rooms', [channel.id]);
  // socket.on(channel.id, (message) => {
  //   dispatch(handleNewMessage(message, channel.id));
  // });
  // TODO: exit room
}


export const sendMessage = (message) => async (dispatch, getState) => {
  const { currentchannel, currentuser, socket } = getState();
  socket.emit(currentchannel.id, { user: currentuser, message });
}


export const notifyOtherUser = (dmChannel) => async (dispatch, getState) => {
  const { socket, currentuser } = getState();
  console.log('in Notify Other User');
  const to = dmChannel.otherUser.id;
  dmChannel.otherUser = currentuser;
  dmChannel.notification = true;
  socket.emit('notify user', { 
    channel: dmChannel, 
    to
  });
}

