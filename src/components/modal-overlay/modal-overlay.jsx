import React from "react";
import styles from './modal-overlay.module.css';
import Modal from "../modal/modal";

export default function ModalOverlay({props}){
    return(
        <>
            <div className={styles.modaloverlay}>
                <Modal props={props}/>
            </div>
        </>
    )
}