import React, { FC } from "react";
import { useSelector } from "../../services/store";
import styles from "./order-details.module.css";

export const OrderDetails:FC = () => {
  const orderNum = useSelector((store) => store.ord.orderNum);

  return (
    <>
      <p className={`${styles.title} text text_type_digits_large`}>
        {orderNum}
      </p>
      <p className={`${styles.subtitle} text text_type_digits_medium`}>
        order ID
      </p>
      <div className={styles.check}></div>
      <p className={`${styles.text} text text_type_main_default`}>
        Your order is being prepared
      </p>
      <p
        className={`${styles.text} text text_type_main_default text_color_inactive`}
      >
        Please wait for your order at the orbital station
      </p>
    </>
  );
}
