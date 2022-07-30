import React from "react";
import { useSelector } from "react-redux";
import styles from './loader.module.css';

export default function Loader(){
    const isLoading = useSelector(store => store.ord.isLoading);
    console.log(isLoading);
    return <div className={isLoading ? styles.ldsring : styles.hidden} ><div></div><div></div><div></div><div></div></div>
}