import { POST_ORDER_REQUEST, POST_ORDER_SUCCESS, POST_ORDER_FAILED, CLOSE_ORDER_MODAL  } from "../actions/order";

export const initialState = {
  isLoading: false,
  hasError: false,
  isModalOpen: false,
  order: null,
  orderNum: {},
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
        order: action.order,
        orderNum: action.orderNum
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
