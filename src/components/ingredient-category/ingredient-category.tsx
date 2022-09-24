import React, { FC } from "react";
import { forwardRef } from "react";
import { BurgerIngredient } from "../burger-ingredient/burger-ingredient";
import { TIngredientCategoryProps } from "../../utils/types";
import styles from "./ingredient-category.module.css";

export const IngredientCategory:FC<TIngredientCategoryProps> = forwardRef<HTMLInputElement, TIngredientCategoryProps>(
  ({ title, ingredients, id }, ref) => {
    return (
      <>
        <h2 id={id} className={styles.title} ref={ref}>
          {title}
        </h2>
        <div className={styles.optionscards}>
          {ingredients.map((el, index) => (
            <BurgerIngredient key={index} {...el}></BurgerIngredient>
          ))}
        </div>
      </>
    );
  }
);