import { LOGIN } from "../actions/auth";

const initialState = {
    login: false,
    user: {
        name: '',
        email: '',
        password: ''
    },
    isLoading: false,
    hasError: false
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
        return {
          ...state,
          user: {
            email: action.email,
            password: action.password
          }
        };
      }
    default: {
      return state;
    }
  }
};
