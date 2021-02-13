import { baseAPIUrl } from "../../config";
import { addListenerForChannel, notifyOtherUser } from "./socket";

export const ADD_DM_CHANNEL = "slack-clone/directMessages/ADD_DM_CHANNEL";

export const addDmChannel = dmChannel => ({
  type: ADD_DM_CHANNEL,
  dmChannel,
});

export const createDmChannelThunk = (otherUser) => async (dispatch, getState) => {
  const { authentication: { token } } = getState();
  const response = await fetch(`${baseAPIUrl}/directMessages/`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      otherUser,
    }),
  });

  if (response.ok) {
    const dmChannel = await response.json();
    
    dispatch(addDmChannel(dmChannel));
    dispatch(addListenerForChannel(dmChannel));
    dispatch(notifyOtherUser(dmChannel));

    return dmChannel;
  }
}