import React from "react";
import styles from '../burger-ingredients/burger-ingredients.module.css';
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";

export default function BurgerIngredient({ name, image, calories, proteins, fat, carbohydrates }){
    const [isOpen, setState] = React.useState({ isOpen: false });

    function handleOpen() {
      setState({ isOpen: true });
    }

    return (
        <div className={styles.optioncard} onClick={handleOpen}>
            <img src={image} />
            <p className={styles.optiontext}>{name}</p>
            {isOpen === true ? <ModalOverlay props={{name, image, calories, proteins, fat, carbohydrates}} /> : !isOpen}
        </div>
    );
}

BurgerIngredient.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string
};