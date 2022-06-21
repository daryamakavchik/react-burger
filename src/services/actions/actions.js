import { combineReducers } from 'redux';
import { fetchData } from "../../utils/api";

export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const GET_DATA_FAILED = "GET_DATA_FAILED";

export const initialState = {
  data: [],
  bun: {},
  constructorcontent: [],
  count: {},
  hasError: false,
  isLoading: true,
  currentIngredient: {},
  order: {},
};

export const setIngredientsData = () => {
  return function(dispatch) {
    fetchData().then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_DATA_SUCCESS,
          data: res.data,
          bun: res.data.filter((el) => el.type === "bun")[0],
          constructorcontent: Array.from(res.data.filter((el) => el.type !== "bun"))
        });
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
        bun: action.bun,
        constructorcontent: action.constructorcontent
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
