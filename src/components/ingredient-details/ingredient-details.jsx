import React from 'react';
import styles from "./ingredient-details.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';


export default function IngredientDetails() {
  const location = useLocation();
  const dispatch = useDispatch();
  const data = useSelector(store => store.data.data);
 const [ingredient, setIngredient] = useState(null);

  let id = location.pathname.slice(13);
  let currentIngredient = {};
  currentIngredient = data.find(el => el._id === id);
  currentIngredient && console.log(currentIngredient);
  useEffect(()=>{
		currentIngredient = data.find(el => el._id === id);
    setIngredient(currentIngredient);
	},[id, data]);

  return (
    <>
      <img className={styles.image} src={ingredient && ingredient.image} alt='' />
      <h3 className={styles.name}>{ingredient && ingredient.name}</h3>
      <ul className={styles.values}>
        <li className={styles.value}>
          <p className={styles.nutrient}>Калории,ккал</p>
          <p className={styles.number}>{ingredient && ingredient.calories}</p>
        </li>
        <li className={styles.value}>
          <p className={styles.nutrient}>Белки, г</p>
          <p className={styles.number}>{ingredient && ingredient.proteins}</p>
        </li>
        <li className={styles.value}>
          <p className={styles.nutrient}>Жиры, г</p>
          <p className={styles.number}>{ingredient && ingredient.fat}</p>
        </li>
        <li className={styles.value}>
          <p className={styles.nutrient}>Углеводы, г</p>
          <p className={styles.number}>{ingredient && ingredient.carbohydrates}</p>
        </li>
      </ul>
    </>
  );
}
