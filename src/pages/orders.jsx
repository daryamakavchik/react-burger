import React from "react";
import styles from "./feed.module.css";
import OrderCard from "../components/ordercard/ordercard";
import { wsAuthConnectionStartAction, wsAuthConnectionClosedAction } from '../services/actions/wsauth';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { getCookie } from "../services/actions/auth";

export default function Orders() {
  const dispatch = useDispatch();
  const token = getCookie("token");
  const wsUrl = `wss://norma.nomoreparties.space/orders` + `?token=${token}`;
  const { orders } = useSelector((store) => store.wsAuth);

  useEffect(() => {
    dispatch(wsAuthConnectionStartAction(wsUrl), [dispatch]);
    return () => {
      dispatch(wsAuthConnectionClosedAction(), [dispatch]);
      return;
    };
  }, [dispatch]);

  return (
    <ul className={styles.orders}>
      { orders && orders.map((el) => (
        <OrderCard order={el.order} key={uuidv4()} />
      ))}
    </ul>
  );
}
