import { fetchData } from "../../utils/api";
import { v4 as uuidv4 } from "uuid";
import { AppDispatch } from "./auth";
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

export type TIngredientData = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export const setIngredientsData = () => (dispatch:AppDispatch) => {
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
}

export const onDropHandler = (item:TIngredientData) => (dispatch:AppDispatch) => {
    if (item.type !== 'bun') {
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

export const deleteItem = (item:TIngredientData) => {
  return {
    type: DELETE_ITEM,
    item: item,
  };
};

export const openCurrentIngredient = (props:TIngredientData) => (dispatch:AppDispatch) =>{
    dispatch({
      type: OPEN_CURRENT_INGREDIENT,
      payload: props,
    });
};

export const closeCurrentIngredient = () => (dispatch:AppDispatch) =>{
    dispatch({
      type: CLOSE_CURRENT_INGREDIENT,
    });
};


export const updateItems = () => (dispatch:AppDispatch) =>{
    dispatch({
      type: UPDATE_ITEMS
    })
}
