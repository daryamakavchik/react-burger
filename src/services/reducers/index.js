import { combineReducers } from "redux";
import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILED,
  OPEN_CURRENT_INGREDIENT,
  CLOSE_CURRENT_INGREDIENT,
  CLOSE_ORDER_MODAL,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  ADD_ITEM,
  ADD_BUN,
  DELETE_ITEM,
  UPDATE_ITEMS,
} from "../actions";

export const initialState = {
  isLoading: false,
  hasError: false,
  data: [],
  burgerIngredients: {
    bun: null,
    fillings: []
  },
  isModalOpen: false,
  currentIngredient: {
    image: null,
    name: null,
    calories: null,
    proteins: null,
    fat: null,
    carbohydrates: null,
  },
  orderNum: {},
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: action.data,
        burgerIngredients: {
          ...state.burgerIngredients,
          bun: action.bun,
          fillings: action.fillings,
        },
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

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      return {
        ...state,
        burgerIngredients: {
          ...state.burgerIngredients,
          fillings: [
            ...state.burgerIngredients.fillings.map((item) => ({
              ...item,
              count: (item.count || 1) + (item._id === action.item._id),
            })),
            ...(state.burgerIngredients.fillings.some(
              (item) => item._id === action.item._id
            )
              ? []
              : 
              [{ ...action.item, count: 1 }]),
          ],
        },
      };
    }
    case ADD_BUN: {
      return {
        ...state,
        burgerIngredients: {
          ...state.burgerIngredients,
          bun: {...action.item, count: 1}
        }
      }
    }
 
    case DELETE_ITEM: {
      return {
        ...state,
        burgerIngredients: {
          ...state.burgerIngredients,
          fillings: state.burgerIngredients.fillings
            .map((item) =>
              item._id === action.item._id
                ? { ...item, count: item.count - 1 }
                : item
            )
            .filter((item) => item.count > 0),
        },
      };
    }
    case UPDATE_ITEMS: {
      const fillings = [...state.burgerIngredients.fillings];
      fillings.splice(
        action.toIndex,
        0,
        fillings.splice(action.fromIndex, 1)[0]
      );
      return {
        ...state,
        burgerIngredients: {
          ...state.burgerIngredients,
          fillings: fillings,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export const currentIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_CURRENT_INGREDIENT: {
      return {
        ...state,
        isModalOpen: true,
        currentIngredient: {
          ...state.currentIngredient,
          image: action.payload.image,
          name: action.payload.name,
          calories: action.payload.calories,
          proteins: action.payload.proteins,
          fat: action.payload.fat,
          carbohydrates: action.payload.carbohydrates,
        },
      };
    }
    case CLOSE_CURRENT_INGREDIENT: {
      return {
        ...state,
        isModalOpen: false,
        currentIngredient: {
          ...state.currentIngredient,
          image: null,
          name: null,
          calories: null,
          proteins: null,
          fat: null,
          carbohydrates: null,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        isModalOpen: true,
        isLoading: false,
        orderNum: action.orderNum,
      };
    }
    case POST_ORDER_FAILED: {
      return {
        ...state,
        hasError: true,
        isLoading: false,
      };
    }
    case CLOSE_ORDER_MODAL: {
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
  data: dataReducer,
  constr: constructorReducer,
  ingr: currentIngredientReducer,
  ord: orderReducer,
});
