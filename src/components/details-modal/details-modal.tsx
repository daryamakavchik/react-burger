import React from "react";
import ReactDOM from "react-dom";
import styles from "./details-modal.module.css";

const modalsContainer = document.querySelector("#modals");
type DetailsModalProps = {
  title: string;
  children: React.ReactNode
}

export const DetailsModal = ( props:DetailsModalProps ) => {
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