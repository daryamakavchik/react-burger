import React from 'react';
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

export default function ModalOverlay({ onClick }) {
  return <div className={styles.modaloverlay} onClick={onClick} />;
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func,
};
