import { SET_LOGIN_DATA } from "../actions/authentication";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_LOGIN_DATA:
      return action.user;

    default:
      return state;
  }
}