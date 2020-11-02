import { SET_CURRENT_CHANNEL } from '../actions/currentchannel';

export default function reducer(state = {}, action) {
  switch(action.type) {
    case SET_CURRENT_CHANNEL:
      return action.currentchannel;
      
    default:
      return state;
  }
}