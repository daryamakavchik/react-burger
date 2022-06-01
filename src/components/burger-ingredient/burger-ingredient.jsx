import { useModal } from "../modal/modal";
import IngredientsDetails from "../ingredients-details/ingredients-details";
import styles from "../burger-ingredients/burger-ingredients.module.css";
import PropTypes from "prop-types";

export default function BurgerIngredient(props) {
  const [Modal, openModal] = useModal();

  return (
    <>
      <div className={styles.optioncard} onClick={openModal}>
        <img src={props.image} />
        <p className={styles.optiontext}>{props.name}</p>
      </div>
      <Modal title="Детали ингридиента">
        <IngredientsDetails {...props} />
      </Modal>
    </>
  );
}

const BurgerIngredientPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
});

BurgerIngredient.propTypes = {
  props: BurgerIngredientPropTypes,
};
