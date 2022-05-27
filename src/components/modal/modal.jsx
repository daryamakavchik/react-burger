import React from "react";
import styles from "./modal.module.css";
import IngredientsDetails from "../ingredients-details/ingredients-details";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function Modal({ props }){
const [isOpen, setState] = React.useState();

function handleClose(){
    setState(!isOpen);
}

    return (
        <>
        <div className={styles.modal}></div>
        <IngredientsDetails props={props}/>
        <button className={styles.closebutton} onClick={handleClose}>
            <CloseIcon />
        </button>
        </>
    )
}