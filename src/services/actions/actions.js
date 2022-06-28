import { combineReducers } from "redux";
import { apiPostOrder, fetchData } from "../../utils/api";

export const GET_DATA_REQUEST = "GET_DATA_REQUEST";
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const GET_DATA_FAILED = "GET_DATA_FAILED";
export const CURRENT_INGREDIENT_OPENED = "CURRENT_INGREDIENT_OPENED";
export const CURRENT_INGREDIENT_CLOSED = "CURRENT_INGREDIENT_CLOSED";
export const ORDER_MODAL_CLOSED = "ORDER_MODAL_CLOSED";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const POST_ORDER_FAILED = "POST_ORDER_FAILED";
export const ADD_ITEM = "ADD_ITEM";
export const ADD_BUN = "ADD_BUN";
export const DELETE_ITEM = "DELETE_ITEM";
export const UPDATE_ITEMS = "UPDATE_ITEMS";

export const initialState = {
  isLoading: true,
  data: [],
  burgerIngredients: {
    buns: [],
    otherIngredients: [],
  },
  hasError: false,
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
    dispatch({
      type: GET_DATA_REQUEST
    })
    fetchData().then(
      (res) => { 
        if (res && res.success) {
        dispatch({
          type: GET_DATA_SUCCESS,
          data: res.data,
          buns: res.data.filter((el) => el.type === "bun"),
          otherIngredients: [],
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
    case GET_DATA_REQUEST: {
      return {
        ...state,
        isLoading: true,
    }
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
    default: {
      return state;
    }
  }
};

export const setConstructorReducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_ITEM: {
      let ingredients = state.burgerIngredients.otherIngredients;
      return {
        ...state,
        burgerIngredients: {
          ...state.burgerIngredients,
          otherIngredients: [ ...ingredients.map(
            (item) => ({ ...item, 
              count: (item.count || 1) + (item._id === action.item._id)
            })
            ),
          ...(ingredients.some((item) => item._id === action.item._id)
            ? []
            : [{...action.item,
              count: 1,
            }])],
        },
      };
    }
    case ADD_BUN: {
      return {
        ...state,
        burgerIngredients: {
          ...state.burgerIngredients,
          buns: state.burgerIngredients.buns
          .map((bun) => bun._id !== action.bun._id ? action.bun : bun)
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
            .map((item) => item._id === action.item._id ? { ...item, count: item.count - 1 } : item)
            .filter((item) => item.count > 0),
        },
      };
    }
     case UPDATE_ITEMS: {
      const ingredients = [...state.burgerIngredients.otherIngredients];
      ingredients.splice(
        action.toIndex, 0, ingredients.splice(action.fromIndex, 1)[0]
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
}

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

export const onDropHandler = (item) => {
  return function(dispatch) {
  if (item.type !== "bun" && item.dragged === undefined) { 
      dispatch({
        type: ADD_ITEM,
        item: item,
      })
    }
  if (item.type === "bun") {
      dispatch({
        type: ADD_BUN,
        bun: item,
      });
    }
  }
}

export const deleteItem = (item) => {
  return function(dispatch) {
    dispatch({
      type: DELETE_ITEM,
      item: item,
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
  constr: setConstructorReducer,
  ingr: openIngredientReducer,
  ord: makeOrderReducer,
});
