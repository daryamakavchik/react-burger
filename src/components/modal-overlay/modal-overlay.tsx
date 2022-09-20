import React, { FC } from 'react';
import { TModalOverlayProps } from '../../utils/types';
import styles from "./modal-overlay.module.css";

export const ModalOverlay:FC<TModalOverlayProps> = (props: TModalOverlayProps) => {
  return <div className={styles.modaloverlay} onClick={props.onClick} />;
}