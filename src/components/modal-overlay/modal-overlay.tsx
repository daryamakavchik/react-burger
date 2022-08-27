import React, { FC } from 'react';
import styles from "./modal-overlay.module.css";

export const ModalOverlay:FC = ({ onClick }) => {
  return <div className={styles.modaloverlay} onClick={onClick} />;
}