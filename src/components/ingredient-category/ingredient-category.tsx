import React, { FC } from "react";
import { forwardRef } from "react";
import { TIngredientData } from "../../services/actions";
import { BurgerIngredient } from "../burger-ingredient/burger-ingredient";
import styles from "./ingredient-category.module.css";

type PropsType = {
  title: string,
  ingredients: Array<TIngredientData>,
  id: string
}

export const IngredientCategory:FC<PropsType> = forwardRef<HTMLInputElement, PropsType>(
  ({ title, ingredients, id }, ref) => {
    return (
      <>
        <h2 id={id} className={styles.title} ref={ref}>
          {title}
        </h2>
        <div className={styles.optionscards}>
          {ingredients.map((el, ind) => (
            <BurgerIngredient key={ind} {...el}></BurgerIngredient>
          ))}
        </div>
      </>
    );
  }
);