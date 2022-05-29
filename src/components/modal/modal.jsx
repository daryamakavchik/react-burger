import OrderDetails from "../order-details/order-details";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function Modal(props) { 

  return (
    <>
      <div className={props.className}>
        <h2 className={styles.title}></h2>
        <button className={styles.closebutton} onClick={props.handleClose}>
          <CloseIcon />
        </button>
        <OrderDetails />
      </div>
    </>
  );
}
