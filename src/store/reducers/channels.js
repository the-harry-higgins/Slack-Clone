import { SET_CHANNELS, SET_CHANNEL_NOTIFICATION } from "../actions/channels";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_CHANNELS:
      let dict = {};
      let ids = [];
      action.channels.forEach(channel => {
        dict[channel.id] = channel;
        ids.push(channel.id);
      });
      return { dict, ids };
    
    case SET_CHANNEL_NOTIFICATION:
      const updatedChannel = {...state.dict[action.id]}
      updatedChannel.notification = !updatedChannel.notification;
      return { 
        ids: [...state.ids], 
        dict: {...state.dict, [action.id]: updatedChannel}
      };
      
    default:
      return state;
  }
}