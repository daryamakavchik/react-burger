import React, { FC } from "react";
import styles from "./feed.module.css";
import { OrderCard } from "../components/ordercard/ordercard";
import { wsConnectionStartAction, wsConnectionClosedAction, wsConnectionGetOrdersAction } from '../services/actions/ws';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCookie } from "../services/actions/auth";
import { RootState } from "../services/store";

export const Orders:FC = () => {
  const dispatch = useDispatch();
  const token = getCookie('token');
  const wsUrl = `wss://norma.nomoreparties.space/orders` + `?token=${token}`;
  let { orders } = useSelector((store:RootState) => store.ws);
  const reversedorders = [...orders].reverse();
  
  useEffect(() => {
    dispatch(wsConnectionStartAction(wsUrl));
    return () => {
      dispatch(wsConnectionClosedAction());
    };
  }, [dispatch]);

  return ( orders && 
    <ul className={styles.orders}>
      { reversedorders.map((el) => (
        <OrderCard order={el} key={el._id} />
      ))}
    </ul>
  );
}
