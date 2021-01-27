import { SET_THEME } from "../actions/theme";
import { SET_LOGIN_DATA } from "../actions/authentication";

export default function reducer(state = [], action) {
  switch (action.type) {
    case SET_LOGIN_DATA:
    case SET_THEME:
      return action.theme;

    default:
      return state;
  }
}