// import { useModal } from "../modal/modal";
import React from "react";
import IngredientsDetails from "../ingredients-details/ingredients-details";
import styles from "../burger-ingredients/burger-ingredients.module.css";
import { ingredientsPropTypes } from "../../utils/proptypes";
import Modal from "../modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { openCurrentIngredient, closeCurrentIngredient } from "../../services/actions/actions";

export default function BurgerIngredient(props) {
  // console.log(props);
  const dispatch = useDispatch();
  const modalOpen = useSelector(store => store.ingr.isModalOpen);

  const openModal = () => {
    dispatch(openCurrentIngredient(props), [dispatch]);
  };

  const closeAllModals = () => {
    dispatch(closeCurrentIngredient(props), [dispatch]);
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
      {modalOpen && (
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
