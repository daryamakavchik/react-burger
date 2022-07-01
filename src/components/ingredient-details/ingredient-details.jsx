import React from 'react';
import styles from "./ingredient-details.module.css";
import { useSelector } from 'react-redux';

export default function IngredientDetails() {
  const {image, name, calories, fat, proteins, carbohydrates} = useSelector(store => ({
    image: store.ingr.currentIngredient.image,
    name: store.ingr.currentIngredient.name,
    calories: store.ingr.currentIngredient.calories,
    fat: store.ingr.currentIngredient.fat,
    proteins: store.ingr.currentIngredient.proteins,
    carbohydrates: store.ingr.currentIngredient.carbohydrates,
  }));

  return (
    <>
      <img className={styles.image} src={image} alt='' />
      <h3 className={styles.name}>{name}</h3>
      <ul className={styles.values}>
        <li className={styles.value}>
          <p className={styles.nutrient}>Калории,ккал</p>
          <p className={styles.number}>{calories}</p>
        </li>
        <li className={styles.value}>
          <p className={styles.nutrient}>Белки, г</p>
          <p className={styles.number}>{proteins}</p>
        </li>
        <li className={styles.value}>
          <p className={styles.nutrient}>Жиры, г</p>
          <p className={styles.number}>{fat}</p>
        </li>
        <li className={styles.value}>
          <p className={styles.nutrient}>Углеводы, г</p>
          <p className={styles.number}>{carbohydrates}</p>
        </li>
      </ul>
    </>
  );
}
