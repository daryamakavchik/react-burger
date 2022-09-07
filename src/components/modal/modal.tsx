import React, { FC } from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { useSelector } from '../../services/store';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { TModalProps } from "../../utils/types";
import styles from "./modal.module.css";

const modalsContainer = document.querySelector("#modals");

export const Modal:FC<TModalProps> = (props:TModalProps) => {

  const handleEscKeydown = (event: KeyboardEvent) => {
    event.key === "Escape" && props.onClose!();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscKeydown);
    return () => {
      document.removeEventListener("keydown", handleEscKeydown);
    };
  }, [handleEscKeydown]);

  return ReactDOM.createPortal(
    <>
      <div className={!props.title ? styles.ordermodal : styles.modal}>
        <button className={styles.closebutton} onClick={props.onClose}>
          <CloseIcon type='primary' />
        </button>
       {props.title && <h3 className={styles.title}>{props.title}</h3> }
        {props.children}
      </div>
      <ModalOverlay onClick={props.onClose!} />
    </>,
    modalsContainer!
  );
}