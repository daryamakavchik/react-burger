import React, { FC } from "react";
import { useSelector } from "react-redux";
import styles from './loader.module.css';

export const Loader:FC = () => {
    const isLoading = useSelector(store => store.ord.isLoading);
    return <div className={isLoading ? styles.ldsring : styles.hidden} ><div></div><div></div><div></div><div></div></div>
}