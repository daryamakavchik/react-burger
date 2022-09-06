import React, { useEffect, useState, FC} from "react";
import { useDispatch, useSelector } from '../../services/store';
import { useHistory } from "react-router-dom";
import { useDrop } from "react-dnd";

import { CurrencyIcon, Button, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { BurgerElement } from "../burger-element/burger-element";
import { Loader } from "../loader/loader";

import { onDropHandler, deleteItem, TIngredientData } from "../../services/actions";
import { openOrderModal, closeOrderModal } from "../../services/actions/order";
import styles from "./burger-constructor.module.css";

export const BurgerConstructor:FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [totalPrice, setTotalPrice] = useState(0);
  const userName = useSelector((store) => store.user.user.name);
  const isLoading = useSelector((store) => store.ord.isLoading);
  const modalOpen = useSelector((store) => store.ord.isModalOpen);

  const { bun, content } = useSelector((store) => ({
    bun: store.constr.burgerIngredients.bun,
    content: store.constr.burgerIngredients.fillings,
  }));

  const dropHandler = (item:TIngredientData) => {
    dispatch(onDropHandler(item));
  };
  const deleteHandler = (item:TIngredientData) => {
    dispatch(deleteItem(item));
  };

  const [, dropTarget] = useDrop(() => ({
    accept: "ingredient",
    drop: (item:TIngredientData, monitor) => {
      dropHandler(item);
    },
  }));

  const bunsPrice = bun && bun.price * 2;
  const bunIdArr = bun && [`${bun._id}`];
  const orderData =
    bun &&
    content &&
    Array.from(content.map((el:TIngredientData) => el._id))
      .concat(bunIdArr!)
      .concat(bunIdArr!);

  const openModal = () => {
      dispatch(openOrderModal(orderData!));
  };
  const redirectFunc = () => {
    history.replace({ pathname: "/login" });
  };

  const closeAllModals = () => {
    dispatch(closeOrderModal());
  };

  let total =
    bun && bunsPrice
      ? content.reduce(function(acc:number, obj:TIngredientData) {
          return acc + obj.price * obj.count;
        }, bunsPrice)
      : content.reduce(function(acc:number, obj:TIngredientData) {
          return acc + obj.price * obj.count;
        }, 0);

  useEffect(() => {
    setTotalPrice(total);
  }, [total, totalPrice, setTotalPrice]);

  return (
    <>
      <div className={styles.components} ref={dropTarget}>
        {!bun && content.length === 0 && (
          <div className={styles.subtitle}>
            <p className="text text_type_main-medium">
              Пожалуйста, перенесите сюда булку и ингредиенты для создания
              заказа
            </p>
          </div>
        )}
        {!bun && content.length > 0 && (
          <p className={`${styles.subtitlebun} text text_type_main-medium`}>
            Осталось добавить булку{" "}
            <span role="img" aria-label="eyes">
              👀
            </span>
          </p>
        )}
        {bun && content.length === 0 && (
          <p className={`${styles.subtitlemain} text text_type_main-medium`}>
            Осталось добавить начинку{" "}
            <span role="img" aria-label="eyes">
              👀
            </span>
          </p>
        )}
        {bun && (
          <div className={styles.component}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name + " (верх)"}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
        <ul className={styles.componentlist}>
          {content.map(
            (item:TIngredientData, index:number) =>
              item.count > 0 && (
                <BurgerElement
                  key={item._id}
                  item={item}
                  handleClose={() => deleteHandler(item)}
                  index={index}
                />
              )
          )}
        </ul>
        {bun && (
          <>
            <div className={styles.component}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={bun.name + " (низ)"}
                price={bun.price}
                thumbnail={bun.image}
              />
            </div>
          </>
        )}
        {content.length > 0 && bun && (
          <>
            <div className={styles.total}>
              <div className={styles.text}>
                <p className="text text_type_digits-medium">{total}</p>
              </div>
              <CurrencyIcon type="primary" />
              <div className={styles.button}>
                <Button
                  type="primary"
                  size="medium"
                  onClick={userName.length > 0 ? openModal : redirectFunc}
                >
                  {!isLoading ? "Оформить заказ" : "Загрузка..."}
                </Button>
              </div>
              <Loader />
            </div>
          </>
        )}
        {modalOpen && (
          <Modal onClose={closeAllModals}>
            <OrderDetails />
          </Modal>
        )}
      </div>
    </>
  );
}
