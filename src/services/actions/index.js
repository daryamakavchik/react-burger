import { apiPostOrder, fetchData } from "../../utils/api";
export const GET_DATA_REQUEST = "GET_DATA_REQUEST";
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const GET_DATA_FAILED = "GET_DATA_FAILED";
export const ADD_ITEM = "ADD_ITEM";
export const ADD_BUN = "ADD_BUN";
export const DELETE_ITEM = "DELETE_ITEM";
export const UPDATE_ITEMS = "UPDATE_ITEMS";
export const OPEN_CURRENT_INGREDIENT = "OPEN_CURRENT_INGREDIENT";
export const CLOSE_CURRENT_INGREDIENT = "CLOSE_CURRENT_INGREDIENT";
export const CLOSE_ORDER_MODAL = "CLOSE_ORDER_MODAL";
export const POST_ORDER_REQUEST = "POST_ORDER_REQUEST";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const POST_ORDER_FAILED = "POST_ORDER_FAILED";

export const setIngredientsData = () => {
  return function(dispatch) {
    dispatch({
      type: GET_DATA_REQUEST,
    });
    fetchData().then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_DATA_SUCCESS,
          data: res.data,
          bun: {},
          fillings: [],
        });
      } else {
        dispatch({
          type: GET_DATA_FAILED,
        });
      }
    });
  };
};

export const handleDrop = (item) => {
  return function(dispatch) {
    if (item.type !== 'bun' && item.dragged === undefined) {
      dispatch({
        type: ADD_ITEM,
        item: item,
      });
    }
    else {
      dispatch({
        type: ADD_BUN,
        item: item
      })
    }
  };
};

export const deleteItem = (item) => {
  return {
    type: DELETE_ITEM,
    item: item,
  };
};

export const openCurrentIngredient = (props) => {
  return function(dispatch) {
    dispatch({
      type: OPEN_CURRENT_INGREDIENT,
      payload: props,
    });
  };
};

export const closeCurrentIngredient = () => {
  return function(dispatch) {
    dispatch({
      type: CLOSE_CURRENT_INGREDIENT,
    });
  };
};

export const openOrderModal = (orderData) => {
  return function(dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST,
    });
    apiPostOrder(orderData).then((res) => {
      if (res && res.success) {
        dispatch({
          type: POST_ORDER_SUCCESS,
          orderNum: res.order.number,
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
      type: CLOSE_ORDER_MODAL,
    });
  };
};
