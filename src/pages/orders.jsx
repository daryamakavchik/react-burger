import React from "react";
import styles from "./feed.module.css";
import OrderCard from "../components/ordercard/ordercard";
import { wsConnectionStartAction, wsConnectionClosedAction, wsConnectionGetOrdersAction } from '../services/actions/ws';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCookie } from "../services/actions/auth";

export default function Orders() {
  const dispatch = useDispatch();
  const token = getCookie('token');
  const wsUrl = `wss://norma.nomoreparties.space/orders` + `?token=${token}`;
  const { orders } = useSelector((store) => store.ws);
  
  useEffect(() => {
    dispatch(wsConnectionStartAction(wsUrl), [dispatch]);
    return () => {
      dispatch(wsConnectionClosedAction(), [dispatch]);
    };
  }, [dispatch]);

  return ( orders && 
    <ul className={styles.orders}>
      { orders.reverse().map((el) => (
        <OrderCard order={el} key={el._id} />
      ))}
    </ul>
  );
}
