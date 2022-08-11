import { POST_ORDER_SUCCESS } from '../actions/order';
import {
    WS_AUTH_CONNECTION_CLOSED,
    WS_AUTH_CONNECTION_ERROR,
    WS_AUTH_CONNECTION_START,
    WS_AUTH_CONNECTION_SUCCESS,
    WS_AUTH_GET_ORDERS,
    WS_AUTH_SEND_ORDER
  } from '../actions/wsauth';
  
  export const initialState = {
      wsConnected: false,
      orders: [],
    
      total: 0,
      totalToday: 0,
      loading: false,
    };
    
    export const wsAuthReducer = (state = initialState, action) => {
      switch (action.type) {
        case WS_AUTH_CONNECTION_START: {
          return {
            ...state,
            loading: true,
          }
        }
        case WS_AUTH_CONNECTION_SUCCESS: {
          return {
            ...state,
            error: undefined,
            wsConnected: true,
          };
        }
        case WS_AUTH_CONNECTION_ERROR: {
          return {
            ...state,
            error: action.payload,
            wsConnected: false,
            loading: false,
          };
        }
        case WS_AUTH_CONNECTION_CLOSED: {
          return {
            ...state,
            error: undefined,
            wsConnected: false,
            loading: false,
          };
        }
        case POST_ORDER_SUCCESS: {
            return {
                ...state,
                    orders: [...state.orders, action.order],
                    loading: false
              };
            }
        case WS_AUTH_GET_ORDERS: {
          return {
            ...state,
            error: undefined,
            orders: action.payload.orders,
            total: action.payload.total,
            totalToday: action.payload.totalToday,
            loading: false,
          };
        }
        case WS_AUTH_SEND_ORDER: {
          return {
            ...state,
                orders: [...state.orders, action.order],
                loading: false
          };
        }
        default: {
          return state;
        }
      }
    };