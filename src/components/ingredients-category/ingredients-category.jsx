import React from 'react';
import { forwardRef, useRef } from "react";
import PropTypes from "prop-types";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import styles from "./ingridients-category.module.css";

export const IngredientsCategory = forwardRef(({ title, ingredients, id }, ref) => {
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

IngredientsCategory.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
};
