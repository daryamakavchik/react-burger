import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.css";
import {
  handleDrop,
  deleteItem,
  UPDATE_ITEMS,
  openOrderModal,
  closeOrderModal,
} from "../../services/actions";
import { useDrop } from "react-dnd";
import BurgerElement from "../burger-element/burger-element";
import { v4 as uuidv4 } from "uuid";

export default function BurgerConstructor() {
  const [totalPrice, setTotalPrice] = useState(0);
  const isLoading = useSelector((store) => store.ord.isLoading);
  const modalOpen = useSelector((store) => store.ord.isModalOpen);

  const { bun, content } = useSelector((store) => ({
    bun: store.constr.burgerIngredients.bun,
    content: store.constr.burgerIngredients.fillings,
  }));

  const dispatch = useDispatch();
  const dropHandler = (item) => {
    dispatch(handleDrop(item));
  };
  const deleteHandler = (item) => {
    dispatch(deleteItem(item));
  };

  const bunsPrice = bun && bun.price * 2;
  const bunIdArr = bun && [`${bun._id}, ${bun._id}`];
  const orderData = Array.from(content.map((el) => el._id)).concat(bunIdArr);

  const moveItem = useCallback(
    (dragIndex, hoverIndex) => {
      dispatch({
        type: UPDATE_ITEMS,
        fromIndex: dragIndex,
        toIndex: hoverIndex,
      });
    },
    [dispatch]
  );

  const openModal = () => {
    dispatch(openOrderModal(orderData), [dispatch]);
  };

  const closeAllModals = () => {
    dispatch(closeOrderModal(), [dispatch]);
  };

  let total =
    bun && bunsPrice
      ? content.reduce(function(acc, obj) {
          return acc + obj.price * obj.count;
        }, bunsPrice)
      : content.reduce(function(acc, obj) {
          return acc + obj.price * obj.count;
        }, 0);

  useEffect(() => {
    setTotalPrice(total);
  }, [totalPrice, setTotalPrice]);

  const [, dropTarget] = useDrop(() => ({
    accept: "ingredient",
    drop: (item) => {
      dropHandler(item);
    },
  }));

  return (
    <>
      <div className={styles.components} ref={dropTarget}>
        {!bun && content.length === 0 && (
          <p className="text text_type_main-medium">
            Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа
          </p>
        )}
        {!bun && content.length > 0 && (
          <p className={`${styles.subtitle} text text_type_main-medium`}>
            Осталось добавить булку 👀
          </p>
        )}
        {bun && content.length === 0 && (
          <p className={`${styles.subtitle} text text_type_main-medium`}>
            Осталось добавить начинку 👀
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
            (item, index) =>
              item.count > 0 && (
                <BurgerElement
                  key={uuidv4()}
                  item={item}
                  handleClose={() => deleteHandler(item)}
                  moveItem={moveItem}
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
                <Button type="primary" size="medium" onClick={openModal}>
                  {!isLoading ? "Оформить заказ" : "Загрузка..."}
                </Button>
              </div>
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
