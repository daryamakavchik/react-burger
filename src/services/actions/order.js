import { apiPostOrder } from "../../utils/api";
export const POST_ORDER_REQUEST = "POST_ORDER_REQUEST";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const POST_ORDER_FAILED = "POST_ORDER_FAILED";
export const CLOSE_ORDER_MODAL = "CLOSE_ORDER_MODAL";

export const openOrderModal = (orderData) => {
  return function (dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST,
    });
    apiPostOrder(orderData)
      .then((res) => {
        if (res && res.success) {
          console.log(res);
          dispatch({
            type: POST_ORDER_SUCCESS,
            order: res,
            orderNum: res.order.number,
          });
        } else {
          dispatch({
            type: POST_ORDER_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const closeOrderModal = () => {
  return function (dispatch) {
    dispatch({
      type: CLOSE_ORDER_MODAL,
    });
  };
};
