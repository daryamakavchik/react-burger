import React, { FC } from 'react';
import styles from "./modal-overlay.module.css";

type OverlayProps = {
  onClick: any
}

export const ModalOverlay:FC<OverlayProps> = (props: OverlayProps) => {
  return <div className={styles.modaloverlay} onClick={props.onClick} />;
}