import { combineReducers } from 'redux';
import { fetchData } from "../../utils/api";

export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const GET_DATA_FAILED = "GET_DATA_FAILED";

export const initialState = {
  data: [],
  constructorData: {
    bun: {},
    content: [],
    count: {},
  },
  hasError: false,
  isLoading: true,
  currentIngredient: {},
  order: {},
};

export const setIngredientsData = () => {
  return function(dispatch) {
    fetchData().then((res) => {
      console.log(res.data);
      if (res && res.success) {
        dispatch({
          type: GET_DATA_SUCCESS,
          data: res.data,
          constructorData: {
            bun: res.data.filter((el) => el.type === "bun")[0],
            content: Array.from(res.data.filter((el) => el.type !== "bun"))
          }
        });
        console.log(res.data);
      } else {
        dispatch({
          type: GET_DATA_FAILED,
        });
      }
    });
  };
};

export const setDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_SUCCESS: {
      return {
        ...state,
        data: action.data,
      };
    }
    case GET_DATA_FAILED: {
      return {
        ...state,
        hasError: true,
      };
    }
    default: {
      return state;
    }
  }
};

export const rootReducer = combineReducers({
  data: setDataReducer,
});
