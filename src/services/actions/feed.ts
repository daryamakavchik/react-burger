export const SELECT_ORDER = 'SELECT_ORDER';
export const UNSELECT_ORDER = 'UNSELECT_ORDER';
import { TOrder } from "../../components/statslist/statslist";


export interface ISelectOrder {
  readonly type: typeof SELECT_ORDER;
  order: TOrder;
}

export const selectOrderAction = (order:TOrder) => {
  return {
    type: SELECT_ORDER,
    order: order,
  };
};

export type TOrderActions = ISelectOrder;