import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";

const modalsContainer = document.querySelector("#modals");

export const useModal = () => {
  const [isOpen, setOpen] = useState(false);
  return [
    (props) =>
      isOpen ? (
        <Modal
          setOpen={setOpen}
          {...props}
        />
      ) : null,
    () => setOpen(true)
  ];
};

export default function Modal({
  title,
  setOpen,
  children,
}) {
  const closeModal = () => setOpen(false);

  useEffect(() => {
    document.addEventListener("keydown", closeModal);

    return () => {
      document.removeEventListener("keydown", closeModal);
    };
  }, []);
  
  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}> 
        <button className={styles.closebutton} onClick={closeModal}>
          <CloseIcon />
        </button>
        <h3 className={styles.title}>{title}</h3>
        {children}
      </div>
      <ModalOverlay onClick={closeModal} />
    </>,
    modalsContainer
  );
}
