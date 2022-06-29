import React from 'react';
import { forwardRef } from "react";
import PropTypes from "prop-types";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import styles from "./ingredient-category.module.css";

export const IngredientCategory = forwardRef(({ title, ingredients, id }, ref) => {
  return (
    <>
      <h2 id={id} className={styles.title} ref={ref}>
        {title}
      </h2>
      <div className={styles.optionscards}>
        {ingredients.map((el, ind) => (
          <BurgerIngredient key={ind} {...el} />
        ))}
      </div>
    </>
  );
});

IngredientCategory.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
};
