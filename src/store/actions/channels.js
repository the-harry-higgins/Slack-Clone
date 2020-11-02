export const SET_CHANNELS = "slack-clone/channels/SET_CHANNELS";
export const SET_CHANNEL_NOTIFICATION = "slack-clone/channels/SET_CHANNEL_NOTIFICATION";

export const setChannels = channels => ({ type: SET_CHANNELS, channels });

export const setChannelNotification = id => ({ type: SET_CHANNEL_NOTIFICATION, id })