import React, { FC } from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";

const modalsContainer = document.querySelector("#modals");

type ModalProps = {
  title?: string,
  onClose?: any,
  children?: React.ReactNode
}

export const Modal:FC<ModalProps> = (props:ModalProps) => {
  const isOrderModal = useSelector((store:RootState) => store.feed.isModalOpen);
  const isIngredientModal = useSelector((store:RootState) => store.ingr.isIngredientModal);

  const handleEscKeydown = (event: KeyboardEvent) => {
    event.key === "Escape" && props.onClose();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscKeydown);
    return () => {
      document.removeEventListener("keydown", handleEscKeydown);
    };
  }, [handleEscKeydown]);

  return ReactDOM.createPortal(
    <>
      <div className={isOrderModal ? styles.ordermodal : styles.modal}>
        <button className={styles.closebutton} onClick={props.onClose}>
          <CloseIcon type='primary' />
        </button>
       {isIngredientModal && <h3 className={styles.title}>{props.title}</h3> }
        {props.children}
      </div>
      <ModalOverlay onClick={props.onClose} />
    </>,
    modalsContainer!
  );
}