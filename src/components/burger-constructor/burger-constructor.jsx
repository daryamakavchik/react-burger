import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.css";
import {
  openOrderModal,
  closeOrderModal,
  onDropHandler,
  deleteItem,
  setDragItem,
  removeDragItem,
} from "../../services/actions/actions";
import { useDrop } from "react-dnd";
import BurgerElement from "../burger-element/burger-element";

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);

  const { buns, content } = useSelector((store) => ({
    buns: store.data.burgerIngredients.buns,
    content: store.data.burgerIngredients.otherIngredients,
  }));

  const dropHandler = (item) => {dispatch(onDropHandler(item))};
  const deleteThis = (item) => {dispatch(deleteItem(item))};
  const setDragProperty = (item) => {dispatch(setDragItem(item))};

  const bun = (buns.length && buns[0]) || undefined;
  const bunIdArr = buns.length && [`${bun._id}, ${bun._id}`];
  const orderData = buns.length && Array.from(content.map((el) => el._id)).concat(bunIdArr);
  const bunsPrice = buns.length && bun && bun.price * 2;

  const [{ isHover }, dropTarget] = useDrop((e) => ({
    accept: "ingredient",
    drop: (item, monitor) => {
      dropHandler(item);
      console.log(monitor.getItem());
    },
    collect: (monitor) => ({
      isHover: !!monitor.isOver(),
    }),
  }));

  const orderNum = useSelector((store) => store.ord.orderNum);
  const modalOpen = useSelector((store) => store.ord.isModalOpen);

  const openModal = () => {
    dispatch(openOrderModal(orderData), [dispatch]);
  };

  const closeAllModals = () => {
    dispatch(closeOrderModal(), [dispatch]);
  };

  const handleEscKeydown = (event) => {
    event.key === "Escape" && closeAllModals();
  };

  let total = buns.length && bun && bunsPrice && content.reduce(function(acc, obj) { return acc + (obj.price * obj.count) }, bunsPrice);
  useEffect(() => { setTotalPrice(total) }, [totalPrice, setTotalPrice]);

  const onDragStartHandler = (e, item) => {
    setDragProperty(item);
  }

  const onDragEndHandler = (e, item) => {
  }

  const onDragOverHandler = (e) => {

  }

  const onDragLeaveHandler = (e, item) => {

  }

  const onDropDropHandler = (e, item) => {
  }


  return (
    buns.length && (
      <>
        <div className={styles.components} ref={dropTarget}>
          <div className={styles.component}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name + " (верх)"}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
          <ul className={styles.componentlist}>
            {content.map(
              (item, index) =>
                item.count > 0 && (
                  <BurgerElement 			        
                  key={item._id}
                  item={item}
                  handleClose={() => deleteThis(item)}
                  index={index} 
                  onDragStartHandler={onDragStartHandler}
                  onDragEndHandler={onDragEndHandler}
                  onDragOverHandler={onDragOverHandler}
                  onDragLeaveHandler={onDragLeaveHandler}
                  />
                )
            )}
          </ul>
          <div className={styles.component}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name + " (низ)"}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
          <div className={styles.total}>
            <div className={styles.text}>
              <p className="text text_type_digits-medium">{total}</p>
            </div>
            <CurrencyIcon type="primary" />
            <div className={styles.button}>
              <Button type="primary" size="medium" onClick={openModal}>
                Оформить заказ
              </Button>
            </div>
          </div>
          {modalOpen && (
            <Modal
              onOverlayClick={closeAllModals}
              onEscKeyDown={handleEscKeydown}
            >
              <OrderDetails />
            </Modal>
          )}
        </div>
      </>
    )
  );
}
