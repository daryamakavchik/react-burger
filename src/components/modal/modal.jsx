import React from 'react';
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import PropTypes from "prop-types";

const modalsContainer = document.querySelector("#modals");

export default function Modal({ title, onOverlayClick, onEscKeyDown, children }) {

  useEffect(() => { document.addEventListener("keydown", onEscKeyDown);
    return () => {
      document.removeEventListener("keydown", onEscKeyDown);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <button className={styles.closebutton} onClick={onOverlayClick}>
          <CloseIcon />
        </button>
        <h3 className={styles.title}>{title}</h3>
        {children}
      </div>
      <ModalOverlay onClick={onOverlayClick} />
    </>,
    modalsContainer
  );
}

Modal.propTypes = {
  title: PropTypes.string, 
  onOverlayCLick: PropTypes.func,
  onEscKeyDown: PropTypes.func,
  children: PropTypes.element.isRequired
};
