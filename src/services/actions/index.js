import { apiPostOrder, fetchData } from "../../utils/api";
export const GET_DATA_REQUEST = "GET_DATA_REQUEST";
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const GET_DATA_FAILED = "GET_DATA_FAILED";
export const ADD_ITEM = "ADD_ITEM";
export const ADD_BUN = "ADD_BUN";
export const DELETE_ITEM = "DELETE_ITEM";
export const UPDATE_ITEMS = "UPDATE_ITEMS";
export const CURRENT_INGREDIENT_OPENED = "CURRENT_INGREDIENT_OPENED";
export const CURRENT_INGREDIENT_CLOSED = "CURRENT_INGREDIENT_CLOSED";
export const ORDER_MODAL_CLOSED = "ORDER_MODAL_CLOSED";
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
          buns: res.data.filter((el) => el.type === "bun"),
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

export const onDropHandler = (item) => {
  return function(dispatch) {
    if (item.type !== "bun" && item.dragged === undefined) {
      dispatch({
        type: ADD_ITEM,
        item: item,
      });
    }
    if (item.type === "bun") {
      dispatch({
        type: ADD_BUN,
        bun: item,
      });
    }
  };
};

export const deleteItem = (item) => {
  return function(dispatch) {
    dispatch({
      type: DELETE_ITEM,
      item: item,
    });
  };
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
      type: ORDER_MODAL_CLOSED,
    });
  };
};