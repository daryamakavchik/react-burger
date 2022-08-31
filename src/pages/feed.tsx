import React, { useEffect, FC } from "react";
import styles from "./feed.module.css";
import { useDispatch } from "react-redux";
import { OrderCard } from "../components/ordercard/ordercard";
import { useSelector } from "react-redux";
import {
  wsConnectionClosedAction,
  wsConnectionStartAction,
} from "../services/actions/ws";
import { StatsList } from "../components/statslist/statslist";
import { filterOrders } from "../utils/functions";
import { RootState } from "../services/store"

type TOrder = {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number
};

type TOrders = TOrder[];

export const FeedPage:FC = () => {
  const dispatch = useDispatch();
  const { orders, total, totalToday } = useSelector((store:RootState) => store.ws);
  
  const statusArrays = filterOrders(orders);
  const doneArray = statusArrays?.done.slice(0, 30);
  const pendingArray = statusArrays?.pending.slice(0, 30);

  useEffect(() => {
    dispatch(
      wsConnectionStartAction("wss://norma.nomoreparties.space/orders/all")
    );
    return () => {
      dispatch(wsConnectionClosedAction());
    };
  }, [dispatch]);

  return (
    <>
      <h2 className={`${styles.title} text text_type_main-large`}>
        Лента заказов
      </h2>
      <div className={styles.content}>
        <ul className={styles.orders}>
          {orders &&
            orders.map((order:TOrder) => <OrderCard order={order} key={order._id} />)}
        </ul>
        <div className={styles.ordernums}>
          <div className={styles.completed}>
            <div className={styles.types}>
              <div className={styles.type}>
                <p className={`${styles.subtitle} text text_type_main-default`}>
                  Готовы:
                </p>
                <StatsList orders={doneArray} />
              </div>
              <div className={styles.type}>
                <p className={`${styles.subtitle} text text_type_main-default`}>
                  В работе:
                </p>
                <StatsList orders={pendingArray} />
              </div>
            </div>
          </div>
          <div>
            <p className={`${styles.subtitledone} text text_type_main-default`}>
              Выполнено за все время:
            </p>
            <p className={`${styles.digitslarge} text text_type_digits-large`}>
              {total}
            </p>
          </div>
          <div>
            <p className={`${styles.subtitledone} text text_type_main-default`}>
              Выполнено за сегодня:
            </p>
            <p className={`${styles.digitslarge} text text_type_digits-large`}>
              {totalToday}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
