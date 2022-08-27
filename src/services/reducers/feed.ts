import { 
    SELECT_ORDER
} from '../actions/feed';
import { TOrderActions } from '../actions/feed';


type TInitialOrderState = {
  orders: TOrder[],
  currentOrder: TOrder,
  isModalOpen: boolean,
  isOrderInfoOpen: boolean,
  done: TOrder[],
  inProgress: TOrder[],
}

const initialOrderState = {
  orders: [],
  currentOrder: null,
  isModalOpen: false,
  isOrderInfoOpen: false,
  done: [],
  inProgress: [],
};

export const feedReducer = (state = initialOrderState, action:TOrderActions ):TInitialOrderState => {
  switch (action.type) {
    case SELECT_ORDER: {
      return {
        ...state,
        currentOrder: action.order,
        isOrderInfoOpen: true
      };
    }
    default: {
      return state;
    }
  }
};