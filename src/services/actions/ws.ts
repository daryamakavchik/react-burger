export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_GET_ORDERS: "WS_GET_ORDERS" = "WS_GET_ORDERS";
export const WS_SEND_ORDER: "WS_SEND_ORDER" = "WS_SEND_ORDER";

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  wsUrl: string;
}

export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  error: any;
}

export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsConnectionGetOrders {
  readonly type: typeof WS_GET_ORDERS;
  orders: any;
}

export interface IWsConnectionSendOrder {
  readonly type: typeof WS_SEND_ORDER;
  order: any;
}

export type TWSActions =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsConnectionGetOrders
  | IWsConnectionSendOrder;

export const wsConnectionStartAction = (wsUrl: string): IWsConnectionStart => {
  return {
    type: WS_CONNECTION_START,
    wsUrl,
  };
};

export const wsConnectionSuccessAction = (): IWsConnectionSuccess => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionErrorAction = (error: any): IWsConnectionError => {
  return {
    type: WS_CONNECTION_ERROR,
    error: error,
  };
};

export const wsConnectionClosedAction = (): IWsConnectionClosed => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsConnectionGetOrdersAction = (
  orders: Array<any>
): IWsConnectionGetOrders => {
  return {
    type: WS_GET_ORDERS,
    orders: orders,
  };
};

export const wsConnectionSendOrderAction = (
  order: string[]
): IWsConnectionSendOrder => {
  return {
    type: WS_SEND_ORDER,
    order: order,
  };
};

export type TActions = {
  wsStart: typeof WS_CONNECTION_START;
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onError: typeof WS_CONNECTION_ERROR;
  onOrders: typeof WS_GET_ORDERS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onSendOrders: typeof WS_SEND_ORDER;
};
