import { SET_CHANNELS } from "../actions/channels";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_CHANNELS: {
      let dict = {};
      let ids = [];
      action.channels.forEach(channel => {
        dict[channel.id] = channel;
        ids.push(channel.id);
      });
      return { dict, ids };
    }
    default:
      return state;
  }
}