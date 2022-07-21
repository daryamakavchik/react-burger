import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED, REGISTER, GET_USER } from "../actions/auth";

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
      case GET_USER: {
        console.log('success');
      }
    default: {
      return state;
    }
  }
};
