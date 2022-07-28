import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, Link } from "react-router-dom";
import { useDrag } from "react-dnd";
import { ingredientsPropTypes } from "../../utils/proptypes";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import { openCurrentIngredient, closeCurrentIngredient } from "../../services/actions";
import IngredientDetails from "../ingredient-details/ingredient-details";
import styles from "../burger-ingredients/burger-ingredients.module.css";

export default function BurgerIngredient(props) {
  const dispatch = useDispatch();
  const modalOpen = useSelector((store) => store.ingr.isModalOpen);
  const location = useLocation();
  const history = useHistory();
  const data = useSelector((store) => store.data.data);

  let count;
  const { bun, fillings } = useSelector((store) => ({
    bun: store.constr.burgerIngredients.bun,
    fillings: store.constr.burgerIngredients.fillings,
  }));
  fillings &&
    fillings.map((el) => (el._id === props._id ? (count = el.count) : null));
  let buncount = bun && bun._id === props._id && bun.count;

  const openModal = () => {
    dispatch(openCurrentIngredient(props), [dispatch]);
  };

  const closeAllModals = () => {
    history.goBack();
    dispatch(closeCurrentIngredient(props), [dispatch]);
  };

  const [, dragRef] = useDrag(
    () => ({
      type: "ingredient",
      item: props,
    }),
    [props]
  );

  return (
    <>
      <Link
        to={{
          pathname: `/ingredients/${props._id}`,
          state: { background: location },
        }}
        className={styles.link}
      >
        <div className={styles.optioncard} onClick={openModal} ref={dragRef}>
          {count && <Counter count={count} />}
          {buncount && <Counter count={buncount} />}
          <img src={props.image} alt="" />
          <p className={styles.optiontext}>{props.name}</p>
        </div>
      </Link>
      {modalOpen && (
        <>
          <Modal title="Детали ингридиента" onClose={closeAllModals}>
            <IngredientDetails data={data} />
          </Modal>
        </>
      )}
    </>
  );
}

BurgerIngredient.propTypes = ingredientsPropTypes.isRequired;
