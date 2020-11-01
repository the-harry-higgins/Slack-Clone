export const SET_CURRENT_CHANNEL = 'slack-clone/currentchannel/SET_CURRENT_CHANNEL';

export const setCurrentChannel = currentchannel => ({ type: SET_CURRENT_CHANNEL, currentchannel });

export const updateCurrentChannel = id => async(dispatch, getState) => {
  const { channels } = getState();
  const currentchannel = {...channels.dict[id]}
  dispatch(setCurrentChannel(currentchannel)); 
}