import { combineReducers } from "redux";
import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILED,
  OPEN_CURRENT_INGREDIENT,
  CLOSE_CURRENT_INGREDIENT,
  ADD_ITEM,
  ADD_BUN,
  DELETE_ITEM,
  UPDATE_ITEMS,
} from "../actions";
import { POST_ORDER_SUCCESS } from "../actions/order";
import { orderReducer } from "./order";
import { userReducer } from "./auth";
import { feedReducer } from "./feed";
import { wsReducer } from "./ws";
import { TConstructorActions } from "../actions";
import { TIngredientData } from "../actions";

export const initialConstructorState:TInitialConstructorState = {
  isLoading: false,
  hasError: false,
  data: [],
  burgerIngredients: {
    bun: null,
    fillings: []
  },
  isModalOpen: false,
  isIngredientModal: false,
  currentIngredient: {
    image: null,
    name: null,
    calories: null,
    proteins: null,
    fat: null,
    carbohydrates: null,
  }
};

export type TInitialConstructorState = {
  isLoading: boolean,
  hasError: boolean,
  data: Array<TIngredientData>,
  burgerIngredients: {
    bun: any,
    fillings: Array<any>
  },
  isModalOpen: boolean,
  isIngredientModal: boolean,
  currentIngredient: {
    image: any,
    name: any,
    calories: any,
    proteins: any,
    fat: any,
    carbohydrates: any,
  }
};

export const dataReducer = (state = initialConstructorState, action: TConstructorActions):TInitialConstructorState => {
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

export const constructorReducer = (state = initialConstructorState, action:TConstructorActions) => {
  switch (action.type) {
    case ADD_ITEM: {
      let ingredientAmount = state.burgerIngredients.fillings.filter(function(item:TIngredientData){return item._id === action.item._id}).length + 1; 
      return {
        ...state,
        burgerIngredients: {
          ...state.burgerIngredients,
          fillings: 
          [...state.burgerIngredients.fillings.map((item:TIngredientData) => 
            ({...item, added: ingredientAmount})),
            ...[{ ...action.item, added: 1, key: action.key, count: ingredientAmount }],
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
            .map((item?:TIngredientData) =>
              item?._id === action.item?._id
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
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
      burgerIngredients: {
        bun: null,
        fillings: []
      },
    }
  }
    default: {
      return state;
    }
  }
};

export const currentIngredientReducer = (state = initialConstructorState, action:TConstructorActions) => {
  switch (action.type) {
    case OPEN_CURRENT_INGREDIENT: {
      return {
        ...state,
        isModalOpen: true,
        isIngredientModal: true,
        currentIngredient: {
          ...state.currentIngredient,
          image: action.props.image,
          name: action.props.name,
          calories: action.props.calories,
          proteins: action.props.proteins,
          fat: action.props.fat,
          carbohydrates: action.props.carbohydrates,
        },
      };
    }
    case CLOSE_CURRENT_INGREDIENT: {
      return {
        ...state,
        isModalOpen: false,
        isIngredientModal: false,
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


export const rootReducer = combineReducers({
  data: dataReducer,
  constr: constructorReducer,
  ingr: currentIngredientReducer,
  ord: orderReducer, 
  user: userReducer,
  feed: feedReducer,
  ws: wsReducer,
});
