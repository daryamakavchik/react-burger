import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";

const modalsContainer = document.querySelector("#modals");

export const useModal = () => {
  const [isOpen, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  return [
    (props) =>
      isOpen ? (
        <Modal
          isOpen={isOpen}
          onOverlayClick={closeModal}
          onEscKeydown={closeModal}
          {...props}
        />
      ) : null,
    setOpen,
  ];
};

export default function Modal({
  title,
  onOverlayClick,
  onEscKeydown,
  children,
}) {

  useEffect(() => {
    document.addEventListener("keydown", onEscKeydown);

    return () => {
      document.removeEventListener("keydown", onEscKeydown);
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
