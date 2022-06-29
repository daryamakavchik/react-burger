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

export default function BurgerConstructor() {
  const [totalPrice, setTotalPrice] = useState(0);
  const isLoading = useSelector((store) => store.ord.isLoading);
  const modalOpen = useSelector((store) => store.ord.isModalOpen);

  const { buns, content } = useSelector((store) => ({
    buns: store.data.burgerIngredients.buns,
    content: store.constr.burgerIngredients.fillings,
  }));

  const dispatch = useDispatch();
  const dropHandler = (item) => {dispatch(handleDrop(item))};
  const deleteHandler = (item) => {dispatch(deleteItem(item))};

  const bun = (buns.length && buns[0]) || undefined;
  const bunsPrice = buns.length && bun && bun.price * 2;
  const bunIdArr = buns.length && [`${bun._id}, ${bun._id}`];
  const orderData = buns.length && Array.from(content.map((el) => el._id)).concat(bunIdArr);


  const moveItem = useCallback((dragIndex, hoverIndex) => {
      dispatch({
        type: UPDATE_ITEMS,
        fromIndex: dragIndex,
        toIndex: hoverIndex,
      });
    }, [dispatch] );

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

  const [, dropTarget] = useDrop(() => ({
    accept: "ingredient",
    drop: (item) => { 
      dropHandler(item);
    },
  }));

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
                {!isLoading ? 'Оформить заказ' : 'Загрузка...'}
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

 
