import { baseAPIUrl } from "../../config";
import { setChannelNotification } from './channels';

export const SET_MESSAGES = "slack-clone/messages/SET_MESSAGES";
export const ADD_MESSAGE = 'slack-clone/messages/ADD_MESSAGE';

export const setMessages = messages => ({ type: SET_MESSAGES, messages });
export const addMessage = message => ({ type: ADD_MESSAGE, message });

export const getMessages = id => async(dispatch, getState) => {
  const { authentication: { token } } = getState();
  const response = await fetch(`${baseAPIUrl}/channels/${id}/messages`, {
    method: "get",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.ok) {
    const { messages } = await response.json();
    dispatch(setMessages(messages));
  }
}


export const handleNewMessage = (message, id) => async (dispatch, getState) => {
  const { currentchannel } = getState();
  if (currentchannel.id === id) {
    // Add message to messages
    dispatch(addMessage(message));
  } else {
    // Set notification setting on the channel
    dispatch(setChannelNotification(id, true));
  }
}