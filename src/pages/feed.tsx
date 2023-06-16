import React, { useEffect, FC } from "react";
import styles from "./feed.module.css";
import { useDispatch, useSelector } from '../services/store';
import { OrderCard } from "../components/ordercard/ordercard";
import { StatsList } from "../components/statslist/statslist";
import { filterOrders } from "../utils/functions";
import {
  wsConnectionClosedAction,
  wsConnectionStartAction,
} from "../services/actions/ws";

export const FeedPage:FC = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.ws);
  
  const statusArrays = filterOrders(orders!.orders);
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
        Order feed
      </h2>
      <div className={styles.content}>
        <ul className={styles.orders}>
          {orders &&
            orders.orders.map((order) => <OrderCard order={order} key={order._id} />)}
        </ul>
        <div className={styles.ordernums}>
          <div className={styles.completed}>
            <div className={styles.types}>
              <div className={styles.type}>
                <p className={`${styles.subtitle} text text_type_main-default`}>
                  Done:
                </p>
                <StatsList orders={doneArray} />
              </div>
              <div className={styles.type}>
                <p className={`${styles.subtitle} text text_type_main-default`}>
                  In progress:
                </p>
                <StatsList orders={pendingArray} />
              </div>
            </div>
          </div>
          <div>
            <p className={`${styles.subtitledone} text text_type_main-default`}>
              Done in total:
            </p>
            <p className={`${styles.digitslarge} text text_type_digits-large`}>
              {orders?.total}
            </p>
          </div>
          <div>
            <p className={`${styles.subtitledone} text text_type_main-default`}>
              Done today:
            </p>
            <p className={`${styles.digitslarge} text text_type_digits-large`}>
              {orders?.totalToday}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
