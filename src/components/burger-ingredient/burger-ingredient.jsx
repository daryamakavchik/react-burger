import React from "react";
import styles from '../burger-ingredients/burger-ingredients.module.css';
import PropTypes from "prop-types";

export default function BurgerIngredient({ name, image }){
    return (
        <div className={styles.optioncard}>
            <img src={image} />
            <p className={styles.optiontext}>{name}</p>
        </div>
    );
}

BurgerIngredient.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string
};