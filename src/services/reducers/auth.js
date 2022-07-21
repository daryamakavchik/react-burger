import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED, REGISTER, GET_USERINFO_REQUEST, GET_USERINFO_SUCCESS, GET_USERINFO_FAILED, REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILED, refreshToken } from "../actions/auth";
import { refreshTokenAction } from "../actions/auth";

const initialUserState = {
    login: false,
    user: {
        name: '',
        email: '',
        password: '',
    },
    isLoading: false,
    hasError: false,
    accessToken: '',
    refreshToken: ''
}

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case REGISTER: {
      return {
        ...state,
        user: {
          name: action.name,
          email: action.email,
          password: action.password,
          accessToken: action.refreshToken
        }
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true
        }
      }
    case LOGIN_SUCCESS: {
        return {
          ...state,
          isLoading: false,
          accessToken: action.accessToken,
          refreshToken: action.refreshToken,
          user: {
            ...state.user,
            email: action.email,
            password: action.password
          }
        };
      }
      case LOGIN_FAILED: {
        return {
          ...state,
          isLoading: false,
          hasError: true
        };
      }
      case GET_USERINFO_REQUEST: {
        return {
          ...state,
          isLoading: true
        }
      }
      case GET_USERINFO_SUCCESS: {
        return {
          ...state,
          isLoading: false
        }
      }
      case GET_USERINFO_FAILED: {
        refreshTokenAction(action.refreshToken);
        return {
          ...state,
          isLoading: false,
          hasError: true
        }
      }
      case REFRESH_TOKEN_REQUEST: {
        return {
          ...state,
          isLoading: true
      }
      }
      case REFRESH_TOKEN_SUCCESS: {
        return {
          ...state,
          isLoading: false,
          accessToken: action.accessToken,
          refreshToken: action.refreshToken,
      }
    }
      case REFRESH_TOKEN_FAILED: {
        return {
          ...state,
          isLoading: false,
          hasError: true
      }
      }
    default: {
      return state;
    }
  }
};
