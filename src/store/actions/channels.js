import { baseAPIUrl } from "../../config";
import { addListenerForChannel, removeListenerForChannel } from "./socket";

export const SET_CHANNELS = "slack-clone/channels/SET_CHANNELS";
export const SET_CHANNEL_NOTIFICATION = "slack-clone/channels/SET_CHANNEL_NOTIFICATION";
export const JOIN_CHANNEL = "slack-clone/channels/JOIN_CHANNEL";
export const LEAVE_CHANNEL = "slack-clone/channels/LEAVE_CHANNEL";

export const setChannels = channels => ({ type: SET_CHANNELS, channels });
export const setChannelNotification = id => ({ type: SET_CHANNEL_NOTIFICATION, id })
export const joinChannel = channel => ({ type: JOIN_CHANNEL, channel });
export const leaveChannel = channel => ({ type: LEAVE_CHANNEL, channel });

export const joinChannelThunk = (channel) => async (dispatch, getState) => {
  const { authentication: { token },  currentuser } = getState();
  const response = await fetch(`${baseAPIUrl}/channels/${channel.id}/`, {
    method: "post",
    headers: { 
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ userId: currentuser.id }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    dispatch(joinChannel(channel));
    dispatch(addListenerForChannel(channel));
  }
}

export const leaveChannelThunk = (channel) => async (dispatch, getState) => {

  const { authentication: { token }, currentuser } = getState();

  const response = await fetch(
    `${baseAPIUrl}/channels/${channel.id}/users/${currentuser.id}`, {
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