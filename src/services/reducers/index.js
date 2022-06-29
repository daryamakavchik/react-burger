import { combineReducers } from "redux";
import { GET_DATA_REQUEST, GET_DATA_SUCCESS, GET_DATA_FAILED, CURRENT_INGREDIENT_OPENED, CURRENT_INGREDIENT_CLOSED, ORDER_MODAL_CLOSED, POST_ORDER_SUCCESS, POST_ORDER_FAILED, ADD_ITEM, ADD_BUN, DELETE_ITEM, UPDATE_ITEMS } from "../actions";

export const initialState = {
  isLoading: true,
  data: [],
  burgerIngredients: {
    buns: [],
    otherIngredients: [],
  },
  hasError: false,
  isModalOpen: false,
  currentIngredient: {
    image: null,
    name: null,
    calories: null, 
    proteins: null, 
    fat: null, 
    carbohydrates: null
  },
  orderNum: {},
};

export const setDataReducer = (state = initialState, action) => {
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
          buns: action.buns,
          otherIngredients: action.otherIngredients,
        },
      };
    }
    case GET_DATA_FAILED: {
      return {
        ...state,
        hasError: true,
      };
    }
    case ADD_BUN: {
      return {
        ...state,
        burgerIngredients: {
          ...state.burgerIngredients,
          buns: state.burgerIngredients.buns.map((bun) =>
            bun._id !== action.bun._id ? action.bun : bun
          ),
        },
      };
    }
    default: {
      return state;
    }
  }
};

export const setConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      let ingredients = state.burgerIngredients.otherIngredients;
      return {
        ...state,
        burgerIngredients: {
          ...state.burgerIngredients,
          otherIngredients: [
            ...ingredients.map((item) => ({
              ...item,
              count: (item.count || 1) + (item._id === action.item._id),
            })),
            ...(ingredients.some((item) => item._id === action.item._id)
              ? []
              : [{ ...action.item, count: 1 }]),
          ],
        },
      };
    }
    case DELETE_ITEM: {
      let ingredients = state.burgerIngredients.otherIngredients;
      return {
        ...state,
        burgerIngredients: {
          ...state.burgerIngredients,
          otherIngredients: ingredients
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
      const ingredients = [...state.burgerIngredients.otherIngredients];
      ingredients.splice(
        action.toIndex,
        0,
        ingredients.splice(action.fromIndex, 1)[0]
      );
      return {
        ...state,
        burgerIngredients: {
          ...state.burgerIngredients,
          otherIngredients: ingredients,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export const openIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_INGREDIENT_OPENED: {
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
        }
      };
    }
    case CURRENT_INGREDIENT_CLOSED: {
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
          carbohydrates: null
        }
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
  constr: setConstructorReducer,
  ingr: openIngredientReducer,
  ord: makeOrderReducer,
});
