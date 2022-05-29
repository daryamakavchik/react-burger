import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal-overlay.module.css";
import Modal from "../modal/modal";

export default function ModalOverlay() {
  const [isOpen, setState] = React.useState(true);

  const [domReady, setDomReady] = React.useState(false);
  React.useEffect(() => { setDomReady(true); });
  const classNameModal = `root ${isOpen === false ? styles.closed : styles.modal}`;
  const classNameOverlay = `root ${isOpen === false ? styles.closed : styles.modaloverlay}`;

  function handleClose(){
    setState(!isOpen);
  }

  return domReady
    ? ReactDOM.createPortal(
        <div className={classNameOverlay} style={{ overflow: "hidden" }}>
          <Modal handleClose={handleClose} className={classNameModal}></Modal>
        </div>,
        document.getElementById("root")
      )
    : null;
}
