import { SET_MESSAGES, ADD_MESSAGE } from "../actions/messages";

export default function reducer(state = [], action) {
  switch (action.type) {
    case SET_MESSAGES:
      return action.messages;

    case ADD_MESSAGE:
      const newState = [...state];
      newState.push(action.message);
      return newState;

    default:
      return state;
  }
}