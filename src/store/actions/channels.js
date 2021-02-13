import { baseAPIUrl } from "../../config";
import { addListenerForChannel, removeListenerForChannel } from "./socket";

export const SET_CHANNELS = "slack-clone/channels/SET_CHANNELS";
export const SET_CHANNEL_NOTIFICATION = "slack-clone/channels/SET_CHANNEL_NOTIFICATION";
export const JOIN_CHANNEL = "slack-clone/channels/JOIN_CHANNEL";
export const LEAVE_CHANNEL = "slack-clone/channels/LEAVE_CHANNEL";
export const DELETE_CHANNEL = "slack-clone/channels/DELETE_CHANNEL";
export const CREATE_CHANNEL = "slack-clone/channels/CREATE_CHANNEL";

export const setChannels = channels => ({ type: SET_CHANNELS, channels });
export const setChannelNotification = (id, bool) => ({ type: SET_CHANNEL_NOTIFICATION, id, bool })
export const joinChannel = channel => ({ type: JOIN_CHANNEL, channel });
export const leaveChannel = channel => ({ type: LEAVE_CHANNEL, channel });
export const deleteChannel = channel => ({ type: DELETE_CHANNEL, channel });
export const createChannel = data => ({ 
  type: CREATE_CHANNEL, 
  channel: data.channel,
  channelUser: data.channelUser 
});

export const joinChannelThunk = (channel) => async (dispatch, getState) => {
  const { authentication: { token } } = getState();
  const response = await fetch(`${baseAPIUrl}/channels/${channel.id}/`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(joinChannel(channel));
    dispatch(addListenerForChannel(channel));
  }
}

export const leaveChannelThunk = (channel) => async (dispatch, getState) => {

  const { authentication: { token } } = getState();

  const response = await fetch(
    `${baseAPIUrl}/channels/${channel.id}/leave/`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  if (response.ok) {
    dispatch(leaveChannel(channel));
    dispatch(removeListenerForChannel(channel));
  }
}

export const deleteChannelThunk = (channel) => async (dispatch, getState) => {
  const { authentication: { token } } = getState();

  const response = await fetch(
    `${baseAPIUrl}/channels/${channel.id}/`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  if (response.ok) {
    dispatch(deleteChannel(channel));
    dispatch(removeListenerForChannel(channel));
  }
}

export const createChannelThunk = (channelName) => async (dispatch, getState) => {
  const { authentication: { token }, currentuser } = getState();
  const response = await fetch(`${baseAPIUrl}/channels/`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId: currentuser.id,
      name: channelName,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createChannel(data));
    dispatch(addListenerForChannel(data.channel));
  }
}