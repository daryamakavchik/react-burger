import React, { useEffect, FC } from "react";
import { useDispatch, useSelector } from '../services/actions/auth';
import { OrderCard } from "../components/ordercard/ordercard";
import { wsConnectionStartAction, wsConnectionClosedAction } from '../services/actions/ws';
import { getCookie } from "../services/actions/auth";
import { RootState } from "../services/store";
import styles from "./feed.module.css";

export const Orders:FC = () => {
  const dispatch = useDispatch();
  const token = getCookie('token');
  const wsUrl = `wss://norma.nomoreparties.space/orders` + `?token=${token}`;
  let { orders } = useSelector((store:RootState) => store.ws);
  const reversedorders = [...orders!.orders].reverse();
  
  useEffect(() => {
    dispatch(wsConnectionStartAction(wsUrl));
    return () => {
      dispatch(wsConnectionClosedAction());
    };
  }, [dispatch, wsUrl]);

  return ( orders && 
    <ul className={styles.orders}>
      { reversedorders.map((el) => (
        <OrderCard order={el} key={el._id} />
      ))}
    </ul>
  );
}
