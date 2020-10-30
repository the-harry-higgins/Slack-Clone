import { SET_CURRENT_USER } from "../actions/authentication";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_USER: {
      return action.user;
    }

    default:
      return state;
  }
}