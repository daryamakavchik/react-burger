import React, { FC } from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const modalsContainer = document.querySelector("#modals");

export const Modal:FC = ({ title, onClose, children }) => {
  const isOrderModal = useSelector(store => store.feed.isModalOpen);
  const isIngredientModal = useSelector(store => store.ingr.isIngredientModal);

  const handleEscKeydown = (event: React.KeyboardEvent) => {
    event.key === "Escape" && onClose();
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
        <button className={styles.closebutton} onClick={onClose}>
          <CloseIcon />
        </button>
       {isIngredientModal && <h3 className={styles.title}>{title}</h3> }
        {children}
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalsContainer
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.element.isRequired,
};
