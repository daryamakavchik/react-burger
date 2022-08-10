export const WS_AUTH_CONNECTION_START = 'WS_AUTH_CONNECTION_START';
export const WS_AUTH_CONNECTION_SUCCESS = 'WS_AUTH_CONNECTION_SUCCESS';
export const WS_AUTH_CONNECTION_CLOSED = 'WS_AUTH_CONNECTION_CLOSED';
export const WS_AUTH_CONNECTION_ERROR = 'WS_AUTH_CONNECTION_ERROR';
export const WS_AUTH_GET_ORDERS = 'WS_AUTH_GET_ORDERS';


  export const wsAuthConnectionStartAction = (wsUrl) => {
    return {
      type: WS_AUTH_CONNECTION_START,
      wsUrl,
    };
  };
  
  export const wsAuthConnectionSuccessAction = () => {
    return {
      type: WS_AUTH_CONNECTION_SUCCESS
    };
  };
  
  export const wsAuthConnectionErrorAction = (error) => {
    return {
      type: WS_AUTH_CONNECTION_ERROR,
      payload: error,
    };
  };
  
  export const wsAuthConnectionClosedAction = () => {
    return {
      type: WS_AUTH_CONNECTION_CLOSED
    };
  };
  
  export const wsAuthConnectionGetOrdersAction = (orders) => {
    return {
      type: WS_AUTH_GET_ORDERS,
      payload: orders,
    };
  };