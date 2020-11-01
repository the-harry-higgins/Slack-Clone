import { SET_CURRENT_CHANNEL } from '../actions/currentchannel';

export default (state = {}, action) => {
  switch(action.type) {
    case SET_CURRENT_CHANNEL:
      return action.currentchannel;
    default:
      return state;
  }
}