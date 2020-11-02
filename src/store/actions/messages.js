import { baseAPIUrl } from "../../config";

export const SET_MESSAGES = "slack-clone/messages/SET_MESSAGES";
export const ADD_MESSAGE = 'slack-clone/messages/ADD_MESSAGE';

export const setMessages = messages => ({ type: SET_MESSAGES, messages });

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

export const addMessage = message => ({ type: ADD_MESSAGE, message });