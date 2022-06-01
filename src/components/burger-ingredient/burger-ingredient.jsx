// import { useModal } from "../modal/modal";
import React from "react";
import IngredientsDetails from "../ingredients-details/ingredients-details";
import styles from "../burger-ingredients/burger-ingredients.module.css";
import { ingredientsPropTypes } from "../../utils/proptypes";
import Modal from "../modal/modal";

export default function BurgerIngredient(props) {
  const [isIngredientsDetailsOpened, setIsIngredientsDetailsOpened] =
    React.useState(false);

  const openModal = () => {
    setIsIngredientsDetailsOpened(true);
  };

  const closeAllModals = () => {
    setIsIngredientsDetailsOpened(false);
  };

  const handleEscKeydown = (event) => {
    event.key === "Escape" && closeAllModals();
  };

  return (
    <>
      <div className={styles.optioncard} onClick={openModal}>
        <img src={props.image} />
        <p className={styles.optiontext}>{props.name}</p>
      </div>
      {isIngredientsDetailsOpened && (
        <Modal
          title="Детали ингридиента"
          onOverlayClick={closeAllModals}
          onEscKeyDown={handleEscKeydown}
        >
          <IngredientsDetails {...props} />
        </Modal>
      )}
    </>
  );
}

BurgerIngredient.propTypes = ingredientsPropTypes.isRequired;
