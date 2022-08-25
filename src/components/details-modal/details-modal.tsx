import React from "react";
import ReactDOM from "react-dom";
import styles from "./details-modal.module.css";
import PropTypes from "prop-types";

const modalsContainer = document.querySelector("#modals");

export const DetailsModal:FC = ({ title, children }) => {
  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <h3 className={styles.title}>{title}</h3>
        {children}
      </div>
    </>,
    modalsContainer
  );
}

DetailsModal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
};
