import React from 'react';
import { forwardRef } from "react";
import PropTypes from "prop-types";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import styles from "./ingredient-category.module.css";
import { ingredientsPropTypes } from '../../utils/proptypes';
import { Link } from 'react-router-dom';

export const IngredientCategory = forwardRef(({ title, ingredients, id }, ref) => {
  return (
    <>
      <h2 id={id} className={styles.title} ref={ref}>
        {title}
      </h2>
      <div className={styles.optionscards}>
        {ingredients.map((el, ind) => (
          <Link to={{ pathname: `/ingredients/${el._id}`}} className={styles.link} >
            <BurgerIngredient key={ind} {...el} />
          </Link>
        ))}
      </div>
    </>
  );
});

IngredientCategory.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired,
};
