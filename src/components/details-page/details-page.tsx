import React from "react";
import styles from "./details-page.module.css";
import { TDetailsPageProps } from "../../utils/types";

export const DetailsPage = (props: TDetailsPageProps) => {
  return (
    <div className={styles.modal}>
      <h3 className={styles.title}>{props.title}</h3>
      {props.children}
    </div>
  );
};