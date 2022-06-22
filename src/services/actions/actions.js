import { combineReducers } from "redux";
import { apiPostOrder, fetchData } from "../../utils/api";

export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const GET_DATA_FAILED = "GET_DATA_FAILED";
export const CURRENT_INGREDIENT_OPENED = "CURRENT_INGREDIENT_OPENED";
export const CURRENT_INGREDIENT_CLOSED = "CURRENT_INGREDIENT_CLOSED";
export const ORDER_MODAL_CLOSED = "ORDER_MODAL_CLOSED";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const POST_ORDER_FAILED = "POST_ORDER_FAILED";

export const initialState = {
  data: [],
  bun: {},
  constructorcontent: [],
  count: {},
  hasError: false,
  isLoading: true,
  isModalOpen: false,
  currentIngredientImage: null,
  currentIngredientName: null,
  currentIngredientCalories: null,
  currentIngredientProteins: null,
  currentIngredientFat: null,
  currentIngredientCarbohydrates: null,
  orderNum: {},
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
      payload: props,
    });
  };
};

export const closeCurrentIngredient = () => {
  return function(dispatch) {
    dispatch({
      type: CURRENT_INGREDIENT_CLOSED,
    });
  };
};

export const openOrderModal = (orderData) => {
  return function(dispatch) {
    apiPostOrder(orderData).then((res) => {
      if (res && res.success) {
        dispatch({
          type: POST_ORDER_SUCCESS,
          ordernum: res.order.number,
        });
      } else {
        dispatch({
          type: POST_ORDER_FAILED,
        });
      }
    });
  };
};

export const closeOrderModal = () => {
  return function(dispatch) {
    dispatch({
      type: ORDER_MODAL_CLOSED,
    });
  };
};

export const openIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_INGREDIENT_OPENED: {
      return {
        ...state,
        isModalOpen: true,
        currentIngredientImage: action.payload.image,
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
        isModalOpen: false,
        currentIngredientImage: null,
        currentIngredientName: null,
        currentIngredientCalories: null,
        currentIngredientProteins: null,
        currentIngredientFat: null,
        currentIngredientCarbohydrates: null,
      };
    }
    default: {
      return state;
    }
  }
};

export const makeOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        isModalOpen: true,
        orderNum: action.ordernum,
      };
    }
    case POST_ORDER_FAILED: {
      return {
        ...state,
        hasError: true,
      };
    }
    case ORDER_MODAL_CLOSED: {
      return {
        ...state,
        isModalOpen: false,
      };
    }
    default: {
      return state;
    }
  }
};

export const rootReducer = combineReducers({
  data: setDataReducer,
  ingr: openIngredientReducer,
  ord: makeOrderReducer,
});
