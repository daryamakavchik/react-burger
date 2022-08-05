import React from "react";
import styles from "./statslist.module.css";

export default function StatsList({ done, orders }) {
  console.log(orders);
  const maxOrders = orders.slice(0, 28);
  return (
    <ul className={styles.list}>
      {maxOrders.map((number, index) => (
        <li key={index}>
          <p className={`text text_type_digits-default ${ done && styles.element }`}>{number}</p>
        </li>
      ))}
    </ul>
  );
}
