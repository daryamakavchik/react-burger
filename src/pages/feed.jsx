import React from "react";
import styles from "./feed.module.css";
import { useDispatch } from "react-redux";
import OrderCard from "../components/ordercard/ordercard";
import { useSelector } from 'react-redux';
import { wsConnectionClosedAction, wsConnectionStartAction } from "../services/actions/ws";
import { v4 as uuidv4 } from "uuid";
import StatsList from "../components/statslist/statslist";

export function FeedPage() {
  const dispatch = useDispatch();
  const { orders, total, totalToday } = useSelector((state) => state.ws);
  const { done, inProgress } = useSelector((state) => state.feed);

  React.useEffect(() => {
    dispatch(wsConnectionStartAction('wss://norma.nomoreparties.space/orders/all'));
    return () => {
      dispatch(wsConnectionClosedAction());
    };
  }, [dispatch]);

  const filterOrdersByStatus = (arr) => {
    return arr?.reduce((acc, curr) => {
      curr.status === 'done' ? acc.done = [...acc.done, curr] : acc.pending = [...acc.pending, curr]
      return acc;
    }, { done: [], pending: [] })
  }

  const statusArrays = filterOrdersByStatus(orders);
  const doneArray = statusArrays?.done.slice(0, 30);
  console.log(statusArrays);

  return (
    <>
      <h2 className={`${styles.title} text text_type_main-large`}>
        Лента заказов
      </h2>
      <div className={styles.content}>
        <ul className={styles.orders}>
            {orders && orders.map(order => <OrderCard order={order} key={uuidv4()} />)}
        </ul>
        <div style={{display: 'flex', flexDirection: 'column'}}>
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
              <StatsList orders={statusArrays} />
              </div>
            </div>
          </div>
          <div>
            <p className={`${styles.subtitlee} text text_type_main-default`}>
              Выполнено за все время:
            </p>
            <p className={`${styles.digitslarge} text text_type_digits-large`}>
              {total}
            </p>
          </div>
          <div>
            <p className={`${styles.subtitlee} text text_type_main-default`}>
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