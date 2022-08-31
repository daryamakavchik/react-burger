import { type } from "os";
import {
  apiLoginUser,
  apiLogoutUser,
  apiRegisterUser,
  apiUpdateUser,
  apiUserRequest,
  apiRefreshToken,
  apiPasswordReset,
  apiPasswordSave,
  checkResponse,
  baseUrl,
} from "../../utils/api";
import { store } from "../store";
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { useDispatch as dispatchHook, useSelector as selectorHook, TypedUseSelectorHook } from "react-redux";

export const LOGIN_REQUEST:"LOGIN_REQUEST" = "LOGIN_REQUEST";
export const LOGIN_SUCCESS:"LOGIN_SUCCESS" = "LOGIN_SUCCESS";
export const LOGIN_FAILED:"LOGIN_FAILED" = "LOGIN_FAILED";
export const REGISTER_REQUEST:"REGISTER_REQUEST" = "REGISTER_REQUEST";
export const REGISTER_SUCCESS:"REGISTER_SUCCESS" = "REGISTER_SUCCESS";
export const REGISTER_FAILED:"REGISTER_FAILED" = "REGISTER_FAILED";
export const GET_USERINFO_REQUEST:"GET_USERINFO_REQUEST" = "GET_USERINFO_REQUEST";
export const GET_USERINFO_SUCCESS:"GET_USERINFO_SUCCESS" = "GET_USERINFO_SUCCESS";
export const GET_USERINFO_FAILED:"GET_USERINFO_FAILED" = "GET_USERINFO_FAILED";
export const REFRESH_TOKEN_REQUEST:"REFRESH_TOKEN_REQUEST" = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_SUCCESS:"REFRESH_TOKEN_SUCCESS" = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_FAILED:"REFRESH_TOKEN_FAILED" = "REFRESH_TOKEN_FAILED";
export const RESET_PASSWORD_REQUEST:"RESET_PASSWORD_REQUEST" = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS:"RESET_PASSWORD_SUCCESS" = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED:"RESET_PASSWORD_FAILED" = "RESET_PASSWORD_FAILED";
export const SAVE_PASSWORD_REQUEST:"SAVE_PASSWORD_REQUEST" = "SAVE_PASSWORD_REQUEST";
export const SAVE_PASSWORD_SUCCESS:"SAVE_PASSWORD_SUCCESS" = "SAVE_PASSWORD_SUCCESS";
export const SAVE_PASSWORD_FAILED:"SAVE_PASSWORD_FAILED" = "SAVE_PASSWORD_FAILED";
export const LOGOUT_REQUEST:"LOGOUT_REQUEST" = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS:"LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED:"LOGOUT_FAILED" = "LOGOUT_FAILED";
export const UPDATE_REQUEST:"UPDATE_REQUEST" = "UPDATE_REQUEST";
export const UPDATE_SUCCESS:"UPDATE_SUCCESS" = "UPDATE_SUCCESS";
export const UPDATE_FAILED:"UPDATE_FAILED" = "UPDATE_FAILED";
export const AUTH_CHECKED:"AUTH_CHECKED" = "AUTH_CHECKED";

type RootState = ReturnType<typeof store.getState>;
type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => dispatchHook<AppDispatch>(); 
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

type TUser = {
  name: string;
  email: string;
  password: string;
};

type TLoginActions = ILoginRequest | ILoginSuccess | ILoginFailed;
type TLogoutActions = ILogoutRequest | ILogoutSuccess | ILogoutFailed;
type TUpdateActions = IUpdateRequest | IUpdateSuccess | IUpdateFailed;
type TRegisterActions = IRegisterRequest | IRegisterSuccess | IRegisterFailed;
type TResetPasswordActions =
  | IResetPasswordRequest
  | IResetPasswordSuccess
  | IResetPasswordFailed;
type TSavePasswordActions =
  | ISavePasswordRequest
  | ISavePasswordSuccess
  | ISavePasswordFailed;
type TGetUserInfoActions =
  | IGetUserInfoRequest
  | IGetUserInfoSuccess
  | IGetUserInfoFailed;
type TRefreshTokenActions =
  | IRefreshTokenRequest
  | IRefreshTokenSuccess
  | IRefreshTokenFailed;
type TAuthCheckedActions = IAuthChecked;



export type TApplicationActions =
  | TSavePasswordActions
  | TGetUserInfoActions
  | TLoginActions
  | TLogoutActions
  | TUpdateActions
  | TRegisterActions
  | TResetPasswordActions
  | TRefreshTokenActions
  | TAuthCheckedActions
  | TSavePasswordActions;

export interface ILoginRequest {
  readonly type: typeof LOGIN_REQUEST;
}
export interface ILoginSuccess {
  readonly type: typeof LOGIN_SUCCESS;
  user: TUser;
}
export interface ILoginFailed {
  readonly type: typeof LOGIN_FAILED;
}

export interface IRegisterRequest {
  readonly type: typeof REGISTER_REQUEST;
}
export interface IRegisterSuccess {
  readonly type: typeof REGISTER_SUCCESS;
  user: TUser;
}
export interface IRegisterFailed {
  readonly type: typeof REGISTER_FAILED;
}

export interface IGetUserInfoRequest {
  readonly type: typeof GET_USERINFO_REQUEST;
}
export interface IGetUserInfoSuccess {
  readonly type: typeof GET_USERINFO_SUCCESS;
  user: TUser;
}
export interface IGetUserInfoFailed {
  readonly type: typeof GET_USERINFO_FAILED;
}

export interface IRefreshTokenRequest {
  readonly type: typeof REFRESH_TOKEN_REQUEST;
}
export interface IRefreshTokenSuccess {
  readonly type: typeof REFRESH_TOKEN_SUCCESS;
}
export interface IRefreshTokenFailed {
  readonly type: typeof REFRESH_TOKEN_FAILED;
}

export interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}
export interface IResetPasswordFailed {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

export interface ISavePasswordRequest {
  readonly type: typeof SAVE_PASSWORD_REQUEST;
}
export interface ISavePasswordSuccess {
  readonly type: typeof SAVE_PASSWORD_SUCCESS;
}
export interface ISavePasswordFailed {
  readonly type: typeof SAVE_PASSWORD_FAILED;
}

export interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST;
}
export interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
}
export interface ILogoutFailed {
  readonly type: typeof LOGOUT_FAILED;
}

export interface IUpdateRequest {
  readonly type: typeof UPDATE_REQUEST;
}
export interface IUpdateSuccess {
  readonly type: typeof UPDATE_SUCCESS;
  user: TUser;
}
export interface IUpdateFailed {
  readonly type: typeof UPDATE_FAILED;
}

export interface IAuthChecked {
  readonly type: typeof AUTH_CHECKED;
}

const loginRequest = (): ILoginRequest => ({
  type: LOGIN_REQUEST,
});

const loginSuccess = (user: TUser): ILoginSuccess => ({
  type: LOGIN_SUCCESS,
  user,
});

const loginFailed = (): ILoginFailed => ({
  type: LOGIN_FAILED,
});

const logoutRequest = (): ILogoutRequest => ({
  type: LOGOUT_REQUEST,
});

const logoutSuccess = (): ILogoutSuccess => ({
  type: LOGOUT_SUCCESS,
});

const logoutFailed = (): ILogoutFailed => ({
  type: LOGOUT_FAILED,
});

const updateRequest = (): IUpdateRequest => ({
  type: UPDATE_REQUEST,
});

const updateSuccess = (user: TUser): IUpdateSuccess => ({
  type: UPDATE_SUCCESS,
  user,
});

const updateFailed = (): IUpdateFailed => ({
  type: UPDATE_FAILED,
});

const registerRequest = (): IRegisterRequest => ({
  type: REGISTER_REQUEST,
});

const registerSuccess = (user: TUser): IRegisterSuccess => ({
  type: REGISTER_SUCCESS,
  user,
});

const registerFailed = (): IRegisterFailed => ({
  type: REGISTER_FAILED,
});

const getUserInfoRequest = (): IGetUserInfoRequest => ({
  type: GET_USERINFO_REQUEST,
});

const getUserInfoSuccess = (user: TUser): IGetUserInfoSuccess => ({
  type: GET_USERINFO_SUCCESS,
  user,
});

const getUserInfoFailed = (): IGetUserInfoFailed => ({
  type: GET_USERINFO_FAILED,
});

const checkAuth = (): IAuthChecked => ({
  type: AUTH_CHECKED,
});

const refreshTokenRequest = (): IRefreshTokenRequest => ({
  type: REFRESH_TOKEN_REQUEST,
});

const refreshTokenSuccess = (): IRefreshTokenSuccess => ({
  type: REFRESH_TOKEN_SUCCESS,
});

const refreshTokenFailed = (): IRefreshTokenFailed => ({
  type: REFRESH_TOKEN_FAILED,
});

const resetPasswordRequest = (): IResetPasswordRequest => ({
  type: RESET_PASSWORD_REQUEST,
});

const resetPasswordSuccess = (): IResetPasswordSuccess => ({
  type: RESET_PASSWORD_SUCCESS,
});

const resetPasswordFailed = (): IResetPasswordFailed => ({
  type: RESET_PASSWORD_FAILED,
});

const savePasswordRequest = (): ISavePasswordRequest => ({
  type: SAVE_PASSWORD_REQUEST,
});

const savePasswordSuccess = (): ISavePasswordSuccess => ({
  type: SAVE_PASSWORD_SUCCESS,
});

const savePasswordFailed = (): ISavePasswordFailed => ({
  type: SAVE_PASSWORD_FAILED,
});

export const loginUser = (email: string, password: string) => (dispatch:AppDispatch) => {
    dispatch(loginRequest());
    apiLoginUser(email, password)
      .then((res) => {
        if (res && res.success) {
          dispatch(loginSuccess(res.user));
          const accessToken = res.accessToken.split("Bearer ")[1];
          const refreshToken = res.refreshToken;
          setCookie("token", accessToken, {});
          localStorage.setItem("refreshToken", refreshToken);
        } else {
          dispatch(loginFailed());
        }
      })
      .catch((err) => {
        console.log(err);
      });
};

export const logoutUser = () => (dispatch:AppDispatch) => {
    dispatch(logoutRequest());
    apiLogoutUser(localStorage.getItem("refreshToken")!)
      .then((res) => {
        if (res && res.success) {
          dispatch(logoutSuccess());
          deleteCookie("token");
          localStorage.removeItem("refreshToken");
        } else {
          dispatch(logoutFailed());
        }
      })
      .catch((err) => {
        console.log(err);
      });
};

export const updateUser = (email: string, name: string) => (dispatch:AppDispatch) => {
    dispatch(updateRequest());
    apiUpdateUser(email, name)
      .then((res) => {
        if (res && res.success) {
          dispatch(updateSuccess(res.user));
        } else {
          dispatch(updateFailed());
        }
      })
      .catch((err) => {
        console.log(err);
      });
};

export const registerUser = (name:string, email:string, password:string, redirectFunc:any) => (dispatch:AppDispatch) => {
    dispatch(registerRequest());
    apiRegisterUser(name, email, password)
      .then((res) => {
        if (res.success) {
          dispatch(registerSuccess(res.user));
          const accessToken = res.accessToken.split("Bearer ")[1];
          const refreshToken = res.refreshToken;
          setCookie("token", accessToken, {});
          localStorage.setItem("refreshToken", refreshToken);
          redirectFunc();
        } else {
          dispatch(registerFailed());
        }
      })
      .catch((err) => {
        console.log(err);
      });
};

export const getUserInfo = () => (dispatch:AppDispatch) => {
    dispatch(getUserInfoRequest());
    apiUserRequest()
      .catch((err) => {
        if (err && err.message === "jwt expired") {
          refreshTokenAction();
        }
      })
      .then((res) => {
        if (res && res.success) {
          dispatch(getUserInfoSuccess(res.user));
        } else {
          dispatch(getUserInfoFailed());
        }
      })
      .finally(() => {
        dispatch(checkAuth());
      });
};

export const refreshTokenAction = () => (dispatch:AppDispatch) => {
    dispatch(refreshTokenRequest());
    apiRefreshToken(localStorage.getItem("refreshToken")!)
      .then((res) => {
        if (res && res.success) {
          const prevRefreshToken = localStorage.getItem("refreshToken");

          const accessToken = res.accessToken.split("Bearer ")[1];
          const refreshToken = res.refreshToken;

          deleteCookie("token");
          localStorage.removeItem("refreshToken");

          setCookie("token", accessToken, {});
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch(refreshTokenSuccess());
        } else {
          dispatch(refreshTokenFailed());
        }
        return res;
      })
      .then((fin) => {
        return fetch(`${baseUrl}auth/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("token"),
          },
        });
      })
      .then((res) => checkResponse(res))
      .finally(() => {
        dispatch(checkAuth());
      });
};

export const resetPassword = (email: string, redirectFunc: any) => (dispatch:AppDispatch) => {
    dispatch(resetPasswordRequest());
    apiPasswordReset(email)
      .then((res) => {
        if (res && res.success) {
          dispatch(resetPasswordSuccess());
          redirectFunc();
        } else {
          dispatch(resetPasswordFailed());
        }
      })
      .catch((err) => {
        console.log(err);
      });
};

export const savePassword = (
  password: string,
  code: string,
  redirectFunc: any
) => (dispatch:AppDispatch) => {
    dispatch(savePasswordRequest());
    apiPasswordSave(password, code)
      .then((res) => {
        if (res && res.success) {
          dispatch(savePasswordSuccess());
          redirectFunc();
        } else {
          dispatch(savePasswordFailed());
        }
      })
      .catch((err) => {
        console.log(err);
      });
};

export function setCookie(name: string, value:any, props:any) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export const getCookie = (name:string) => {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export function deleteCookie(name:string) {
  setCookie(name, null, { expires: -1 });
}
