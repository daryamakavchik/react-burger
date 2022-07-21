import {
  apiLoginUser,
  apiRegisterUser,
  apiUserRequest
} from "../../utils/api";

export const LOGIN = "LOGIN";
export const REGISTER = "REGISTER";
export const GET_USER = "GET_USER";

export const loginUser = (email, password, redirectFunc) => {
  return function(dispatch) {
    return apiLoginUser(email, password, redirectFunc).then((res) => {
    if (res && res.success) {
        dispatch({
          type: LOGIN,
          email: email,
          password: password
        });
      };
    })
  };
};

export const registerUser = (name, email, password) => {
  return function(dispatch) {
    return apiRegisterUser(name, email, password).then((res) => {
    if (res && res.success) {
        dispatch({
          type: REGISTER,
          name: name,
          email: email,
          password: password,
          accessToken: res.accessToken
        });
      };
    })
  };
};

export const getUser = (redirectOnSuccess) => {
  return function(dispatch) {
    return apiUserRequest(redirectOnSuccess).then((res) => {
    if (res && res.success) {
        dispatch({
          type: GET_USER
        });
      };
    })
  };
};

