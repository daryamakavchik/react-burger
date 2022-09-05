import React, { FC } from "react";
import { useDispatch } from '../../services/actions/auth';
import { useHistory, useLocation, Link } from "react-router-dom";
import { useDrag } from "react-dnd";
import { useSelector } from "../../services/actions/auth";
import { RootState } from "../../services/store";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { openCurrentIngredient, closeCurrentIngredient } from "../../services/actions";
import { TIngredientData } from "../../utils/types";
import styles from "../burger-ingredients/burger-ingredients.module.css";


export const BurgerIngredient:FC<TIngredientData> = (props:TIngredientData) => {
  const dispatch = useDispatch();
  const modalOpen = useSelector((store:RootState) => store.ingr.isModalOpen);
  const location = useLocation();
  const history = useHistory();
  const data = useSelector<Array<TIngredientData>>((store:RootState) => store.data.data);

  let count;
  const { bun, fillings } = useSelector((store:RootState) => ({
    bun: store.constr.burgerIngredients.bun,
    fillings: store.constr.burgerIngredients.fillings,
  }));
  fillings &&
    fillings.map((el:TIngredientData) => (el._id === props._id ? (count = el.count) : null));
  let buncount = bun && bun._id === props._id && bun.count;

  const openModal = () => {
   dispatch(openCurrentIngredient(props));
  };

  const closeAllModals = () => {
    history.goBack();
    dispatch(closeCurrentIngredient());
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
          <img src={props.image} alt={`${props.name}`} />
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
