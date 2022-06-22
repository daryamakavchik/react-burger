import React from 'react';
import PropTypes from "prop-types";
import { ingredientsPropTypes } from "../../utils/proptypes";
import styles from "./ingredients-details.module.css";
import { useSelector } from 'react-redux';

export default function IngredientsDetails() {
  const {image, name, calories, fat, proteins, carbohydrates} = useSelector(store => ({
    image: store.ingr.currentIngredientImage,
    name: store.ingr.currentIngredientName,
    calories: store.ingr.currentIngredientCalories,
    fat: store.ingr.currentIngredientFat,
    proteins: store.ingr.currentIngredientProteins,
    carbohydrates: store.ingr.currentIngredientCarbohydrates,
  }));

  return (
    <>
      <img className={styles.image} src={image} />
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


IngredientsDetails.propTypes = ingredientsPropTypes.isRequired;
