import React, { FC } from "react";
import styles from "./statslist.module.css";


type PropsType = {
  orders: Array<TOrder>
}
export const StatsList:FC<PropsType> = (props:PropsType) => {
  return (
    <ul className={styles.list}>
      {props.orders.length > 0 ? props.orders.map((order, index) => (
        <li key={index}>
          <p className={`text text_type_digits-default ${styles.element}`}>{order.number}</p>
        </li>
      )) : <div></div>}
    </ul>
  );
}
