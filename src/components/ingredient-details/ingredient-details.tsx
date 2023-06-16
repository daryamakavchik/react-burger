import React, { useState, useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';
import styles from "./ingredient-details.module.css";
import { TIngredientDetailsProps } from '../../utils/types';
import { TIngredientData } from '../../utils/types';

export const IngredientDetails:FC<TIngredientDetailsProps> = (data:TIngredientDetailsProps) => {
  const [ingr, setIngredient] = useState<TIngredientData>();
  const { id } = useParams<{ id?: string }>();

   useEffect(()=>{
		let currentIngredient = data && data.data!.find(el => el._id === id);
    setIngredient(currentIngredient!);
	},[id, data]);

  return (
    <>
      <img className={styles.image} src={ingr?.image} alt={`${ingr?.name}`} />
      <h3 className={styles.name}>{ingr?.name}</h3>
      <ul className={styles.values}>
        <li className={styles.value}>
          <p className={styles.nutrient}>Калории,ккал</p>
          <p className={styles.number}>{ingr?.calories}</p>
        </li>
        <li className={styles.value}>
          <p className={styles.nutrient}>Белки, г</p>
          <p className={styles.number}>{ingr?.proteins}</p>
        </li>
        <li className={styles.value}>
          <p className={styles.nutrient}>Жиры, г</p>
          <p className={styles.number}>{ingr?.fat}</p>
        </li>
        <li className={styles.value}>
          <p className={styles.nutrient}>Углеводы, г</p>
          <p className={styles.number}>{ingr?.carbohydrates}</p>
        </li>
      </ul>
    </>
  );
}
