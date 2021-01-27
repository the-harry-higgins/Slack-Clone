import { JOIN_CHANNEL, LEAVE_CHANNEL, SET_CHANNELS, SET_CHANNEL_NOTIFICATION } from "../actions/channels";
import { SET_LOGIN_DATA } from "../actions/authentication";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_LOGIN_DATA:
    case SET_CHANNELS:
      if (action.channels) {
        let dict = {};
        let ids = [];
        action.channels.forEach(channel => {
          dict[channel.id] = channel;
          ids.push(channel.id);
        });
        return { dict, ids };
      } else {
        return state;
      }
    
    case SET_CHANNEL_NOTIFICATION:
      const updatedChannel = {...state.dict[action.id]}
      updatedChannel.notification = !updatedChannel.notification;
      return { 
        ids: [...state.ids], 
        dict: {...state.dict, [action.id]: updatedChannel}
      };

    case JOIN_CHANNEL:
      return {
        ids: [...state.ids, action.channel.id],
        dict: {...state.dict, [action.channel.id]: action.channel}
      };

    case LEAVE_CHANNEL:
      const ids = [...state.ids]
      const index = state.ids.indexOf(action.channel.id);
      ids.splice(index, 1);

      const dict = {...state.dict};
      delete dict[action.channel.id];
      return {
        ids,
        dict
      }
      
    default:
      return state;
  }
}