import React from "react";
import styles from "./feed.module.css";
import { useDispatch } from "react-redux";
import OrderCard from "../components/ordercard/ordercard";
import { useSelector } from 'react-redux';
import { wsConnectionClosedAction, wsConnectionStartAction } from "../services/actions/ws";
import { setCorrectOrdersAction, setDoneOrdersAction } from "../services/actions/feed";
import { v4 as uuidv4 } from "uuid";
import StatsList from "../components/statslist/statslist";
import { getCorrectOrders, getDoneInProgressOrders, getIngredients } from "../utils/api";

export function FeedPage() {
  const dispatch = useDispatch();
  const { orders, total, totalToday } = useSelector((state) => state.ws);
  const { done, inProgress } = useSelector((state) => state.feed);
  const ingredientsData = useSelector((state) => state.data.data);
  const correctOrders = orders && getCorrectOrders(orders, ingredientsData);
  const doneInProgressOrders = correctOrders && getDoneInProgressOrders(correctOrders);

  React.useEffect(() => {
    dispatch(wsConnectionStartAction('wss://norma.nomoreparties.space/orders/all'));
    return () => {
      dispatch(wsConnectionClosedAction());
    };
  }, [dispatch]);

  React.useEffect(() => {
    if (correctOrders && correctOrders.length && doneInProgressOrders) {
      dispatch(setCorrectOrdersAction(correctOrders));
      dispatch(setDoneOrdersAction(doneInProgressOrders));
    }
  }, []);

  if (!correctOrders) {
    return (
      <p
        className={`${styles.text} text text_type_main-large text_color_inactive`}
      >
        Список пуст
      </p>
    );
  }

  return (
    <>
      <h2 className={`${styles.title} text text_type_main-large`}>
        Лента заказов
      </h2>
      <div className={styles.content}>
        <ul className={styles.orders}>
            {orders.map(order => <OrderCard order={order} key={uuidv4()} />)}
        </ul>
        <div style={{display: 'flex', flexDirection: 'column'}}>
        <div className={styles.completed}>
          <div className={styles.types}>
            <div className={styles.type}>
              <p className={`${styles.subtitle} text text_type_main-default`}>
                Готовы:
              </p>
              <StatsList done={true} orders={done} />
              </div>
            <div className={styles.type}>
              <p className={`${styles.subtitle} text text_type_main-default`}>
                В работе:
              </p>
              <StatsList orders={inProgress} />
              </div>
            </div>
          </div>
          <div>
            <p className={`${styles.subtitle} text text_type_main-default`}>
              Выполнено за все время:
            </p>
            <p className={`${styles.digitslarge} text text_type_digits-large`}>
              {total}
            </p>
          </div>
          <div>
            <p className={`${styles.subtitle} text text_type_main-default`}>
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