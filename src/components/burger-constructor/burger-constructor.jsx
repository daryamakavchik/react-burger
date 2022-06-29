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
  UPDATE_ITEMS
} from "../../services/actions";
import { useDrop } from "react-dnd";
import BurgerElement from "../burger-element/burger-element";

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);

  const { buns, content } = useSelector((store) => ({
    buns: store.data.burgerIngredients.buns,
    content: store.constr.burgerIngredients.otherIngredients,
  }));

  const dropHandler = (item) => {dispatch(onDropHandler(item))};
  const deleteHandler = (item) => {dispatch(deleteItem(item))};

  const bun = (buns.length && buns[0]) || undefined;
  const bunIdArr = buns.length && [`${bun._id}, ${bun._id}`];
  const orderData = buns.length && Array.from(content.map((el) => el._id)).concat(bunIdArr);
  const bunsPrice = buns.length && bun && bun.price * 2;

  const [{ isHover }, dropTarget] = useDrop(() => ({
    accept: "ingredient",
    drop: (item, monitor) => { 
      dropHandler(item);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver()
    }),
  }));

  const moveItem = useCallback((dragIndex, hoverIndex) => {
      dispatch({
        type: UPDATE_ITEMS,
        fromIndex: dragIndex,
        toIndex: hoverIndex,
      });
    }, [dispatch] );

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
                  handleClose={() => deleteHandler(item)}
                  moveItem={moveItem}
                  index={index}
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

 
