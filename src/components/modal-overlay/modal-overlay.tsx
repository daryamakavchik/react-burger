import React, { FC } from 'react';
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

export const ModalOverlay:FC = ({ onClick }) => {
  return <div className={styles.modaloverlay} onClick={onClick} />;
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func,
};
