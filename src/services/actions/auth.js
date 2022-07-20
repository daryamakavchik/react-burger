import {
  apiLoginUser,
} from "../../utils/api";

export const LOGIN = "LOGIN";

export const loginUser = (email, password) => {
  return function(dispatch) {
    return apiLoginUser(email, password).then((res) => {
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
