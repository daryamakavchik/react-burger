import { fetchData } from "../../utils/api";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "./auth";
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
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";


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
  count?: number
}

export interface IGetDataRequest {
  readonly type: typeof GET_DATA_REQUEST
}

export interface IGetDataSuccess {
  readonly type: typeof GET_DATA_SUCCESS,
  data:Array<TIngredientData>,
  bun: object,
  fillings: Array<any>
}

export interface IGetDataFailed {
  readonly type: typeof GET_DATA_FAILED
}

export interface IAddItem {
  readonly type: typeof ADD_ITEM,
  item: TIngredientData,
  key: any
}

export interface IAddBun {
  readonly type: typeof ADD_BUN,
  item: TIngredientData
}

export interface IDeleteItem {
  readonly type: typeof DELETE_ITEM,
  item: TIngredientData
}

export interface IOpenCurrentIngredient {
  readonly type: typeof OPEN_CURRENT_INGREDIENT,
  props: TIngredientData
}

export interface ICloseCurrentIngredient {
  readonly type: typeof CLOSE_CURRENT_INGREDIENT
}

export interface IUpdateItems {
  readonly type: typeof UPDATE_ITEMS,
  toIndex: any,
  fromIndex: any
}

export interface IOrderSuccess {
  readonly type: typeof POST_ORDER_SUCCESS
}

export type TConstructorActions = 
  | IGetDataRequest
  | IGetDataSuccess
  | IGetDataFailed
  | IAddItem
  | IAddBun
  | IDeleteItem
  | IOpenCurrentIngredient
  | ICloseCurrentIngredient
  | IUpdateItems
  | IOrderSuccess;


const getDataRequest = (): IGetDataRequest => ({
  type: GET_DATA_REQUEST,
});

const getDataSuccess = (newdata:Array<TIngredientData>): IGetDataSuccess => ({
  type: GET_DATA_SUCCESS,
  data: newdata,
  bun: {},
  fillings: []
});

const getDataFailed = (): IGetDataFailed => ({
  type: GET_DATA_FAILED
});

const addItem = (item:TIngredientData, key: any): IAddItem => ({
  type: ADD_ITEM,
  item,
  key
})

const addBun = (item:TIngredientData): IAddBun => ({
  type: ADD_BUN,
  item
})

const openIngredient = (props:TIngredientData): IOpenCurrentIngredient => ({
  type: OPEN_CURRENT_INGREDIENT,
  props
});

const closeIngredient = (): ICloseCurrentIngredient => ({
  type: CLOSE_CURRENT_INGREDIENT
});

const updateIngredients = (toIndex: any, fromIndex: any):IUpdateItems => ({
  type: UPDATE_ITEMS,
  toIndex,
  fromIndex
})

const dispatch = useDispatch();

export const setIngredientsData = () => {
    dispatch(getDataRequest());
    fetchData().then((res) => {
      if (res && res.success) {
        dispatch(getDataSuccess(res.data));
      } else {
        dispatch(getDataFailed());
      }
    })
    .catch((err) => {
      console.log(err);
  });
}

export const onDropHandler = (item:TIngredientData) => {
    if (item.type !== 'bun') {
      let key = uuidv4()
      return dispatch(addItem(item, key));
    }
    else {
      return dispatch(addBun(item))
    }
};

export const deleteItem = (item:TIngredientData):IDeleteItem => {
  return {
    type: DELETE_ITEM,
    item: item,
  };
};

export const openCurrentIngredient = (props:TIngredientData) => {
    dispatch(openIngredient(props));
};

export const closeCurrentIngredient = () =>{
    dispatch(closeIngredient());
};


export const updateItems = () => {
    dispatch(updateIngredients('', ''))
}
