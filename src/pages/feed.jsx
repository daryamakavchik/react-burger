import React from "react";
import styles from "./feed.module.css";
import { useDispatch } from "react-redux";
import OrderCard from "../components/ordercard/ordercard";
import { useSelector } from 'react-redux';
import { wsConnectionClosedAction, wsConnectionStartAction } from "../services/actions/ws";
import { setCorrectOrdersAction, setDoneOrdersAction } from "../services/actions/feed";
import { v4 as uuidv4 } from "uuid";

export function FeedPage() {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.ws);
  const ingredientsData = useSelector(
    (state) => state.data.burgerIngredients.fillings
  );
  const getIngredients = (ids, data) => {
    const result = [];
    const ingredients = new Map();
    const buns = new Set();
    ids.forEach((id) => {
      const count = ingredients.get(id);
      if (count) {
        ingredients.set(id, count + 1);
      } else {
        ingredients.set(id, 1);
      }
    });
}

  const getCorrectOrders = (orders, data) => {
    const correctOrders = [];
    orders.forEach((order) => {
      const { ingredients, ...rest } = order;
      const correctIngredients = getIngredients(order.ingredients, data);
      if (correctIngredients && correctIngredients.length) {
        correctOrders.push({ ...rest, ingredients: correctIngredients });
      }
    });
    return correctOrders;
  };

  const getDoneInProgressOrders = (orders) => {
    const done = [];
    const inProgress = [];
    orders.forEach((order) => {
      if (order.status === 'done') {
        done.push(order.number);
      } else {
        inProgress.push(order.number);
      }
    });
    return { done, inProgress };
  };

  const correctOrders = orders && getCorrectOrders(orders, ingredientsData);
  const doneInProgressOrders =
  correctOrders && getDoneInProgressOrders(correctOrders);

 

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
  });

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
        <div className={styles.completed}>
          <div className={styles.types}>
            <div className={styles.type}>
              <p className={`${styles.subtitle} text text_type_main-default`}>
                Готовы:
              </p>
              <p className={`${styles.digits} text text_type_digits-default`}>
                034533
              </p>
              <p className={`${styles.digits} text text_type_digits-default`}>
                034532
              </p>
              <p className={`${styles.digits} text text_type_digits-default`}>
                034530
              </p>
              <p className={`${styles.digits} text text_type_digits-default`}>
                034527
              </p>
              <p className={`${styles.digits} text text_type_digits-default`}>
                034525
              </p>
            </div>
            <div className={styles.type}>
              <p className={`${styles.subtitle} text text_type_main-default`}>
                В работе:
              </p>
              <p
                className={`${styles.digits} ${styles.digitsinactive} text text_type_digits-default`}
              >
                034533
              </p>
              <p
                className={`${styles.digits} ${styles.digitsinactive} text text_type_digits-default`}
              >
                034532
              </p>
              <p
                className={`${styles.digits} ${styles.digitsinactive} text text_type_digits-default`}
              >
                034530
              </p>
            </div>
          </div>
          <div>
            <p className={`${styles.subtitle} text text_type_main-default`}>
              Выполнено за все время:
            </p>
            <p className={`${styles.digitslarge} text text_type_digits-large`}>
              28752
            </p>
          </div>
          <div>
            <p className={`${styles.subtitle} text text_type_main-default`}>
              Выполнено за сегодня:
            </p>
            <p className={`${styles.digitslarge} text text_type_digits-large`}>
              138
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
