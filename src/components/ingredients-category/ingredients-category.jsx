import { forwardRef, useRef } from "react";
import PropTypes from "prop-types";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import styles from "./ingridients-category.module.css";


export const IngredientsCategory = forwardRef(({ title, ingredients}, ref) => {
  
  return (
    <>
        <h2 className={styles.title} ref={ref} >
            {title}
        </h2>
        <div className={styles.optionscards}>
            <BurgerIngredient ingredients={ingredients}/>
        </div>
    </>
  );
});

// IngredientsCategory.propTypes = {
//     props: PropTypes.array,
// };
