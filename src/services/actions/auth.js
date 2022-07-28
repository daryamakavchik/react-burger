import {
  apiLoginUser,
  apiLogoutUser,
  apiRegisterUser,
  apiUpdateUser,
  apiUserRequest,
  apiRefreshToken,
  apiPasswordReset,
  apiPasswordSave,
} from "../../utils/api";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const GET_USERINFO_REQUEST = "GET_USERINFO_REQUEST";
export const GET_USERINFO_SUCCESS = "GET_USERINFO_SUCCESS";
export const GET_USERINFO_FAILED = "GET_USERINFO_FAILED";
export const REFRESH_TOKEN_REQUEST = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_FAILED = "REFRESH_TOKEN_FAILED";
export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";
export const SAVE_PASSWORD_REQUEST = "SAVE_PASSWORD_REQUEST";
export const SAVE_PASSWORD_SUCCESS = "SAVE_PASSWORD_SUCCESS";
export const SAVE_PASSWORD_FAILED = "SAVE_PASSWORD_FAILED";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
export const UPDATE_REQUEST = "UPDATE_REQUEST";
export const UPDATE_SUCCESS = "UPDATE_SUCCESS";
export const UPDATE_FAILED = "UPDATE_FAILED";

export const loginUser = (email, password, redirectFunc) => {
  return function(dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    apiLoginUser(email, password)
      .then((res) => {
        if (res && res.success) {
          const authToken = res.accessToken.split("Bearer ")[1];
          const refreshToken = res.refreshToken;
          setCookie("token", authToken);
          localStorage.setItem("refreshToken", refreshToken);
          dispatch({
            type: LOGIN_SUCCESS,
            name: res.user.name,
            email: email,
            password: password,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
          });
          redirectFunc();
        } else {
          dispatch({
            type: LOGIN_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const logoutUser = () => {
  return function(dispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    apiLogoutUser(localStorage.getItem("refreshToken"))
      .then((res) => {
        if (res && res.success) {
          const refreshToken = res.refreshToken;
          localStorage.removeItem("refreshToken", refreshToken);
          dispatch({
            type: LOGOUT_SUCCESS,
          });
        } else {
          dispatch({
            type: LOGOUT_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateUser = (email, name, token) => {
  return function(dispatch) {
    dispatch({
      type: UPDATE_REQUEST,
    });
    apiUpdateUser(email, name, token)
      .then((res) => {
        if (res && res.success) {
          const refreshToken = res.refreshToken;
          localStorage.setItem("refreshToken", refreshToken);
          dispatch({
            type: UPDATE_SUCCESS,
            email: res.user.email,
            name: res.user.name,
          });
        } else {
          dispatch({
            type: UPDATE_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const registerUser = (name, email, password, redirectFunc) => {
  return function(dispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    });
    apiRegisterUser(name, email, password)
      .then((res) => {
        if (res.success) {
          const authToken = res.accessToken.split("Bearer ")[1];
          const refreshToken = res.refreshToken;
          setCookie("token", authToken);
          localStorage.setItem("refreshToken", refreshToken);
          dispatch({
            type: REGISTER_SUCCESS,
            name: res.user.name,
            email: res.user.email,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
          });
          redirectFunc();
        } else {
          dispatch({
            type: REGISTER_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getUserInfo = () => {
  return function(dispatch) {
    dispatch({
      type: GET_USERINFO_REQUEST,
    });
    apiUserRequest(getCookie("token"))
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USERINFO_SUCCESS,
            name: res.user.name,
            email: res.user.email,
          });
          console.log(res);
        } else {
          dispatch({
            type: GET_USERINFO_FAILED,
          });
          console.log(localStorage.getItem("refreshToken"));
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
    new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : "";
}

export const refreshTokenAction = (token) => {
  return function(dispatch) {
    dispatch({
      type: REFRESH_TOKEN_REQUEST,
    });
    apiRefreshToken(token)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: REFRESH_TOKEN_SUCCESS,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
          });
        } else {
          dispatch({
            type: REFRESH_TOKEN_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const resetPassword = (email, redirectFunc) => {
  return function(dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    apiPasswordReset(email)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: RESET_PASSWORD_SUCCESS,
          });
          redirectFunc();
        } else {
          dispatch({
            type: RESET_PASSWORD_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const savePassword = (password, code, redirectFunc) => {
  return function(dispatch) {
    dispatch({
      type: SAVE_PASSWORD_REQUEST,
    });
    apiPasswordSave(password, code)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SAVE_PASSWORD_SUCCESS,
          });
          redirectFunc();
        } else {
          dispatch({
            type: SAVE_PASSWORD_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
