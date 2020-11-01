import { SET_MESSAGES } from "../actions/messages";

export default function reducer(state = [], action) {
  switch (action.type) {
    case SET_MESSAGES: {
      return action.messages;
    }

    default:
      return state;
  }
}