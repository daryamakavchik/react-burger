import React, { FC } from "react";
import styles from "./statslist.module.css";

export const StatsList:FC = ({ orders }) => {
  return (
    <ul className={styles.list}>
      {orders.length > 0 ? orders.map((order, index) => (
        <li key={index}>
          <p className={`text text_type_digits-default ${styles.element}`}>{order.number}</p>
        </li>
      )) : <div></div>}
    </ul>
  );
}