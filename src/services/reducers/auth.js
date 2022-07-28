import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  GET_USERINFO_REQUEST,
  GET_USERINFO_SUCCESS,
  GET_USERINFO_FAILED,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_FAILED,
} from "../actions/auth";
import { refreshTokenAction } from "../actions/auth";

const initialUserState = {
  isUserAuthorized: false,
  user: {
    name: "",
    email: "",
    password: "",
  },
  isLoading: false,
  hasError: false,
  isTokenUpdated: false,
};

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        user: {
          name: action.name,
          email: action.email,
          password: action.password,
          refreshToken: action.refreshToken,
          accessToken: action.accessToken,
        },
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isUserAuthorized: true,
        user: {
          ...state.user,
          email: action.email,
          name: action.name,
          password: action.password,
          accessToken: action.accessToken,
          refreshToken: action.refreshToken,
        },
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    }
    case GET_USERINFO_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_USERINFO_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          name: action.name,
          email: action.email,
          password: action.password,
        },
      };
    }
    case GET_USERINFO_FAILED: {
      refreshTokenAction(localStorage.getItem("refreshToken"));
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    }
    case REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isTokenUpdated: true,
        user: {
          accessToken: action.accessToken,
          refreshToken: action.refreshToken,
        },
      };
    }
    case REFRESH_TOKEN_FAILED: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isUserAuthorized: false,
        user: {
          email: "",
          name: "",
          password: "",
          accessToken: "",
          refreshToken: "",
        },
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    }
    case UPDATE_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UPDATE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          name: action.name,
          email: action.email,
        },
      };
    }
    case UPDATE_FAILED: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    }
    default: {
      return state;
    }
  }
};
