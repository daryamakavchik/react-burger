import React, { useState, useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';
import styles from "./ingredient-details.module.css";
import { TIngredientData } from '../../pages/orderinfo';

type IngrDetailsProps = {
  data: Array<TIngredientData>
}

export const IngredientDetails:FC<IngrDetailsProps> = (data:IngrDetailsProps) => {
  const [ingr, setIngredient] = useState({});
  const { id } = useParams<{ id?: string }>();

   useEffect(()=>{
		let currentIngredient:TIngredientData = data && data.data!.find(el => el._id === id);
    setIngredient(currentIngredient);
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
