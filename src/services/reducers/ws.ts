import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
  WS_SEND_ORDER
} from "../actions/ws";
import { TWSActions } from '../actions/ws';

type TWSState = {
  wsConnected: boolean;
  orders: Array<any>;
  total: number;
  totalToday: number;
  loading: boolean;

  error?: Event;
}

export const initialWsState:TWSState = {
    wsConnected: false,
    orders: [],
  
    total: 0,
    totalToday: 0,
    loading: false,
  };
  
  export const wsReducer = (state = initialWsState, action: TWSActions) => {
    switch (action.type) {
      case WS_CONNECTION_START: {
        return {
          ...state,
          loading: true,
        }
      }
      case WS_CONNECTION_SUCCESS: {
        return {
          ...state,
          error: undefined,
          wsConnected: true,
        };
      }
      case WS_CONNECTION_ERROR: {
        return {
          ...state,
          error: action.error,
          wsConnected: false,
          loading: false,
        };
      }
      case WS_CONNECTION_CLOSED: {
        return {
          ...state,
          error: undefined,
          wsConnected: false,
          loading: false,
        };
      }
      case WS_GET_ORDERS: {
        return {
          ...state,
          error: undefined,
          orders: action.orders,
          // total: action.total,
          // totalToday: action.totalToday,
          loading: false,
        };
      }
      case WS_SEND_ORDER: {
        return {
          ...state,
          orders: [...state.orders, action.order],
        };
      }
      default: {
        return state;
      }
    }
  };