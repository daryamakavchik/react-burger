import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.css";
import bunimg from "../../images/bun-02.svg";
import {
  openOrderModal,
  closeOrderModal,
  onDropHandler,
  deleteItem,
} from "../../services/actions/actions";
import { useDrop } from "react-dnd";

export default function BurgerConstructor() {
  const dispatch = useDispatch();

  const { buns, content } = useSelector((store) => ({
    buns: store.data.burgerIngredients.buns,
    content: store.data.burgerIngredients.otherIngredients,
  }));

  const dropHandler = (item) => {
    dispatch(onDropHandler(item));
  };
  const deleteThis = (item) => {
    dispatch(deleteItem(item));
  };

  const bun = buns.length && buns[0] || undefined; 
  const bunIdArr = buns.length && [`${bun._id}, ${bun._id}`];
  const orderData = buns.length && Array.from(content.map((el) => el._id)).concat(bunIdArr);

  const [{ isHover }, dropTarget] = useDrop(() => ({
    accept: "ingredient",
    drop: (item) => {
      dropHandler(item);
    },
    collect: (monitor) => ({
      isHover: !!monitor.isOver(),
    }),
  }));

  const orderNum = useSelector((store) => store.ord.orderNum);
  const modalOpen = useSelector((store) => store.ord.isModalOpen);

  const [totalPrice, setTotalPrice] = useState(0);

  const openModal = () => {
    dispatch(openOrderModal(orderData), [dispatch]);
  };

  const closeAllModals = () => {
    dispatch(closeOrderModal(), [dispatch]);
  };

  const handleEscKeydown = (event) => {
    event.key === "Escape" && closeAllModals();
  };

   useEffect(() => {
     let total = buns.length && 0 + bun.price * 2;
     total = content.reduce(function(acc, obj) {
       return acc + obj.price;
     }, total);
     setTotalPrice(total);
   }, [totalPrice, setTotalPrice]);

  return ( buns.length &&
    <>
      <div className={styles.components} ref={dropTarget}>
        <div className={styles.component}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + " (верх)"}
            price={bun.price}
            thumbnail={bunimg}
          />
        </div>
        <ul className={styles.componentlist}>
          {content.map(
            (item, index) =>
              item.count > 0 && (
                <li key={index} className={styles.component}>
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    isLocked={false}
                    handleClose={() => deleteThis(item)}
                  />
                </li>
              )
          )}
        </ul>
        <div className={styles.component}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + " (низ)"}
            price={bun.price}
            thumbnail={bunimg}
          />
        </div>
        <div className={styles.total}>
          <div className={styles.text}>
            <p className="text text_type_digits-medium">{totalPrice}</p>
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
  );
}
