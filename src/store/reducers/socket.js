import { SET_SOCKET } from '../actions/socket';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_SOCKET:
      return action.socket;
    default:
      return state;
  }
}