import PropTypes from "prop-types";
import { ingredientsPropTypes } from "../../utils/proptypes";
import styles from "./ingredients-details.module.css";

export default function IngredientsDetails(props) {
  return (
    <>
      <img className={styles.image} src={props.image} />
      <h3 className={styles.name}>{props.name}</h3>
      <ul className={styles.values}>
        <li className={styles.value}>
          <p className={styles.nutrient}>Калории,ккал</p>
          <p className={styles.number}>{props.calories}</p>
        </li>
        <li className={styles.value}>
          <p className={styles.nutrient}>Белки, г</p>
          <p className={styles.number}>{props.proteins}</p>
        </li>
        <li className={styles.value}>
          <p className={styles.nutrient}>Жиры, г</p>
          <p className={styles.number}>{props.fat}</p>
        </li>
        <li className={styles.value}>
          <p className={styles.nutrient}>Углеводы, г</p>
          <p className={styles.number}>{props.carbohydrates}</p>
        </li>
      </ul>
    </>
  );
}


IngredientsDetails.propTypes = ingredientsPropTypes.isRequired;
