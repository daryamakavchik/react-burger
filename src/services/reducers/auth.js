import { LOGIN, REGISTER, GET_USER } from "../actions/auth";

const initialState = {
    login: false,
    user: {
        name: '',
        email: '',
        password: '',
        accessToken: ''
    },
    isLoading: false,
    hasError: false
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER: {
      return {
        ...state,
        user: {
          name: action.name,
          email: action.email,
          password: action.password,
          accessToken: action.accessToken
        }
      };
    }
    case LOGIN: {
        return {
          ...state,
          user: {
            email: action.email,
            password: action.password
          }
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
