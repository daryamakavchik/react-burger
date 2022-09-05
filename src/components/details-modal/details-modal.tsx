import React from "react";
import ReactDOM from "react-dom";
import styles from "./details-modal.module.css";
import { TDetailsModalProps } from "../../utils/types";

const modalsContainer = document.querySelector("#modals");

export const DetailsModal = ( props:TDetailsModalProps ) => {
  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <h3 className={styles.title}>{props.title}</h3>
        {props.children}
      </div>
    </>,
    modalsContainer!
  );
}