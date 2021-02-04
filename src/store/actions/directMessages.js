import { baseAPIUrl } from "../../config";
import { addListenerForChannel } from "./socket";

export const CREATE_DM_CHANNEL = "slack-clone/directMessages/CREATE_DM_CHANNEL";

export const createDmChannel = dmChannel => ({
  type: CREATE_DM_CHANNEL,
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
    console.log(dmChannel);
    dispatch(createDmChannel(dmChannel));
    dispatch(addListenerForChannel(dmChannel));

    return dmChannel;
  }
}