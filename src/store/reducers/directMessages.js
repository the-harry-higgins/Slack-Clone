import { SET_LOGIN_DATA } from "../actions/authentication";
import { SET_CHANNEL_NOTIFICATION } from "../actions/channels";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_LOGIN_DATA:
      if (action.directMessages) {
        let dict = {};
        let ids = [];
        action.directMessages.forEach(channel => {
          dict[channel.id] = channel;
          ids.push(channel.id);
        });
        return { dict, ids };
      } else {
        return state;
      }

    case SET_CHANNEL_NOTIFICATION:
      const updatedChannel = { ...state.dict[action.id] }
      updatedChannel.notification = !updatedChannel.notification;
      return {
        ids: [...state.ids],
        dict: { ...state.dict, [action.id]: updatedChannel }
      };

    default:
      return state;
  }
}