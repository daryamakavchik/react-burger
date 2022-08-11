import { fetchData } from "../../utils/api";
import { v4 as uuidv4 } from "uuid";
export const GET_DATA_REQUEST = "GET_DATA_REQUEST";
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const GET_DATA_FAILED = "GET_DATA_FAILED";
export const ADD_ITEM = "ADD_ITEM";
export const ADD_BUN = "ADD_BUN";
export const DELETE_ITEM = "DELETE_ITEM";
export const UPDATE_ITEMS = "UPDATE_ITEMS";
export const OPEN_CURRENT_INGREDIENT = "OPEN_CURRENT_INGREDIENT";
export const SET_CURRENT_INGREDIENT = "SET_CURRENT_INGREDIENT";
export const CLOSE_CURRENT_INGREDIENT = "CLOSE_CURRENT_INGREDIENT";

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
    })
    .catch((err) => {
      console.log(err);
  });
};
}

export const onDropHandler = (item) => {
  return function(dispatch) {
    if (item.type !== 'bun' && item.dragged === undefined) {
      dispatch({
        type: ADD_ITEM,
        item: item,
        key: uuidv4()
      });
    }
    else {
      dispatch({
        type: ADD_BUN,
        item: item,
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


export const updateItems = () => {
  return function(dispatch) {
    dispatch({
      type: UPDATE_ITEMS
    })
  }
}
