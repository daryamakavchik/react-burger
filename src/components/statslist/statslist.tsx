import React, { FC } from "react";
import { TStatsListProps } from "../../utils/types";
import styles from "./statslist.module.css";

export const StatsList:FC<TStatsListProps> = (props:TStatsListProps) => {
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
