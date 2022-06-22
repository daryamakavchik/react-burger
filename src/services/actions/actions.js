import { combineReducers } from "redux";
import { fetchData } from "../../utils/api";

export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const GET_DATA_FAILED = "GET_DATA_FAILED";
export const CURRENT_INGREDIENT_OPENED = "CURRENT_INGREDIENT_OPENED";
export const CURRENT_INGREDIENT_CLOSED = "CURRENT_INGREDIENT_CLOSED";

export const initialState = {
  data: [],
  bun: {},
  constructorcontent: [],
  count: {},
  hasError: false,
  isLoading: true,
  isModalOpen: false,
  currentIngredientName: null,
  currentIngredientCalories: null,
  currentIngredientProteins: null,
  currentIngredientFat: null,
  currentIngredientCarbohydrates: null,
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
          constructorcontent: Array.from(
            res.data.filter((el) => el.type !== "bun")
          ),
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
        constructorcontent: action.constructorcontent,
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

export const openCurrentIngredient = (props) => {
  return function(dispatch) {
    dispatch({
      type: CURRENT_INGREDIENT_OPENED,
      payload: props
    });
  };
};

export const closeCurrentIngredient = () => {
  return function(dispatch) {
    dispatch({
      type: CURRENT_INGREDIENT_CLOSED,
    })
  }
}

export const openIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_INGREDIENT_OPENED: {
      console.log(action.payload.name);
      return {
        ...state,
          isModalOpen: true,
          currentIngredientName: action.payload.name,
          currentIngredientCalories: action.payload.calories,
          currentIngredientProteins: action.payload.proteins,
          currentIngredientFat: action.payload.fat,
          currentIngredientCarbohydrates: action.payload.carbohydrates,
      };
    }
    case CURRENT_INGREDIENT_CLOSED: {
      return {
        ...state,
        isModalOpen: false
      }
    }
    default: {
      return state;
    }
  }
};

export const rootReducer = combineReducers({
  data: setDataReducer,
  ingr: openIngredientReducer
});
