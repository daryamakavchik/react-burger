import React from "react";
import IngredientsDetails from "../ingredients-details/ingredients-details";
import styles from "../burger-ingredients/burger-ingredients.module.css";
import { ingredientsPropTypes } from "../../utils/proptypes";
import Modal from "../modal/modal";
import { useDispatch, useSelector } from "react-redux";
import {
  openCurrentIngredient,
  closeCurrentIngredient,
} from "../../services/actions/actions";
import { useDrag } from "react-dnd";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";

export default function BurgerIngredient(props) {
  const dispatch = useDispatch();
  const modalOpen = useSelector((store) => store.ingr.isModalOpen);

  let count;
  const ingredients = useSelector(
    (store) => store.data.burgerIngredients.otherIngredients
  );
  ingredients.map((el) => (el._id === props._id ? (count = el.count) : null));

  const openModal = () => {
    dispatch(openCurrentIngredient(props), [dispatch]);
  };

  const closeAllModals = () => {
    dispatch(closeCurrentIngredient(props), [dispatch]);
  };

  const handleEscKeydown = (event) => {
    event.key === "Escape" && closeAllModals();
  };

  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: "ingredient",
      item: props,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [props]
  );

  return (
    <>
      <div className={styles.optioncard} onClick={openModal} ref={dragRef}>
        {count && <Counter count={count} />}
        <img src={props.image} />
        <p className={styles.optiontext}>{props.name}</p>
      </div>
      {modalOpen && (
        <Modal
          title="Детали ингридиента"
          onOverlayClick={closeAllModals}
          onEscKeyDown={handleEscKeydown}
        >
          <IngredientsDetails />
        </Modal>
      )}
    </>
  );
}

BurgerIngredient.propTypes = ingredientsPropTypes.isRequired;
