import { baseAPIUrl } from "../../config";
import { setChannels } from './channels';
import { setTheme } from './theme';
import { setupListeners } from './socket';

const TOKEN_KEY = "slack-clone/authentication/token";

export const SET_TOKEN = "slack-clone/authentication/SET_TOKEN";
export const REMOVE_TOKEN = "slack-clone/authentication/REMOVE_TOKEN";
export const SET_CURRENT_USER = "slack-clone/authentication/SET_CURRENT_USER";


export const setToken = (token) => ({ type: SET_TOKEN, token });
export const removeToken = () => ({ type: REMOVE_TOKEN });
export const setCurrentUser = (user) => ({ type: SET_CURRENT_USER, user });

export const loadToken = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN_KEY);
  if (token) {
    dispatch(setToken(token));
    dispatch(verifyToken());
  }
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch(`${baseAPIUrl}/auth`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const { token, user, theme, channels } = await response.json();
    window.localStorage.setItem(TOKEN_KEY, token);
    dispatch(setToken(token));
    dispatch(setCurrentUser(user));
    dispatch(setTheme(theme));
    dispatch(setChannels(channels));
    dispatch(setupListeners());
  }
};

export const logout = () => async (dispatch) => {
  window.localStorage.removeItem(TOKEN_KEY);
  dispatch(removeToken());
};

export const verifyToken = () => async (dispatch, getState) => {
  const { authentication: { token } } = getState();
  const response = await fetch(`${baseAPIUrl}/auth/currentuser`, {
    method: "get",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.ok) {
    const { user, theme, channels } = await response.json();
    dispatch(setCurrentUser(user));
    dispatch(setTheme(theme));
    dispatch(setChannels(channels));
    dispatch(setupListeners());
  } else {
    dispatch(logout());
  }
};

export const signUp = (displayName, email, password) => async (dispatch) => {
  const response = await fetch(`${baseAPIUrl}/users`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ displayName, email, password }),
  });

  if (response.ok) {
    const { token, user } = await response.json();
    window.localStorage.setItem(TOKEN_KEY, token);
    dispatch(setToken(token));
    dispatch(setCurrentUser(user));
  }
};