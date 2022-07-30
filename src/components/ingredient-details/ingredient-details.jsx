import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styles from "./ingredient-details.module.css";

export default function IngredientDetails(ingrdata) {
  const [ingr, setIngredient] = useState(null);
  let { id } = useParams();
  let currentIngredient = {};
  console.log(ingrdata);

   useEffect(()=>{
		currentIngredient = ingrdata && ingrdata.data.find(el => el._id === id);
    setIngredient(currentIngredient);
	},[id, ingrdata]);

  return (
    <>
      <img className={styles.image} src={ingr && ingr.image} alt='' />
      <h3 className={styles.name}>{ingr && ingr.name}</h3>
      <ul className={styles.values}>
        <li className={styles.value}>
          <p className={styles.nutrient}>Калории,ккал</p>
          <p className={styles.number}>{ingr && ingr.calories}</p>
        </li>
        <li className={styles.value}>
          <p className={styles.nutrient}>Белки, г</p>
          <p className={styles.number}>{ingr && ingr.proteins}</p>
        </li>
        <li className={styles.value}>
          <p className={styles.nutrient}>Жиры, г</p>
          <p className={styles.number}>{ingr && ingr.fat}</p>
        </li>
        <li className={styles.value}>
          <p className={styles.nutrient}>Углеводы, г</p>
          <p className={styles.number}>{ingr && ingr.carbohydrates}</p>
        </li>
      </ul>
    </>
  );
}
