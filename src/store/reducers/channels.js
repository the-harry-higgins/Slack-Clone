import { 
  CREATE_CHANNEL,
  DELETE_CHANNEL, JOIN_CHANNEL, LEAVE_CHANNEL, SET_CHANNELS, SET_CHANNEL_NOTIFICATION 
} from "../actions/channels";
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
      updatedChannel.notification = action.bool;
      return { 
        ids: [...state.ids], 
        dict: {...state.dict, [action.id]: updatedChannel}
      };

    case DELETE_CHANNEL:
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

    case JOIN_CHANNEL:
    case CREATE_CHANNEL:
      const _ids = [...state.ids]
      _ids.unshift(action.channel.id);

      const _dict = {...state.dict}
      _dict[action.channel.id] = action.channel;

      return {
        ids: _ids,
        dict: _dict
      }
      
    default:
      return state;
  }
}