import {
  apiLoginUser,
  apiRegisterUser,
  apiUserRequest,
  apiRefreshTokenRequest 
} from "../../utils/api";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const REGISTER = "REGISTER";
export const GET_USER = "GET_USER";
export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';

export const loginUser = (email, password, redirectFunc) => {
  return function(dispatch) {
    dispatch({
      type: LOGIN_REQUEST
    })
    apiLoginUser(email, password, redirectFunc).then((res) => {
    if (res && res.success) {
        const authToken = res.accessToken.split('Bearer ')[1];
        const refreshToken = res.refreshToken;
        setCookie('token', authToken);
        localStorage.setItem('refreshToken', refreshToken);
        dispatch({
          type: LOGIN_SUCCESS,
          email: email,
          password: password,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken
        });
        redirectFunc();
      } else {
        dispatch({
          type: LOGIN_FAILED
        })
      }
    })
  };
};

export const registerUser = (name, email, password) => {
  return function(dispatch) {
    return apiRegisterUser(name, email, password).then((res) => {
    if (res && res.success) {
      const authToken = res.accessToken.split('Bearer ')[1];
      const refreshToken = res.refreshToken;
      setCookie('token', authToken);
      localStorage.setItem('refreshToken', refreshToken);
        dispatch({
          type: REGISTER,
          name: name,
          email: email,
          password: password,
          refreshToken: res.refreshToken
        });
      };
    })
  };
};

export const getUserInfo = (token) => {
  return function(dispatch) {
    return apiUserRequest(token).then((res) => {
    if (res && res.success) {
        dispatch({
          type: GET_USER
        });
      };
    })
  };
};

export const setCookie = (name, value, options) => {
  options = options || {};
  let expires = options.expires;
  if (typeof expires === "number" && expires) {
      let d = new Date();
      d.setTime(d.getTime() + expires * 1000);
      expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
      options.expires = expires.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in options) {
      updatedCookie += "; " + propName;
      const propValue = options[propName];
      if (propValue !== true) {
          updatedCookie += "=" + propValue;
      }
  }
  document.cookie = updatedCookie;
};

export function getCookie(name) {
  const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : '';
}