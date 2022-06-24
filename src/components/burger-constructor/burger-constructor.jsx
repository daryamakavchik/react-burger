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
  setIngredientsData,
  setDraggedIngredientsData
} from "../../services/actions/actions";
import { useDrop } from "react-dnd";
import { onDropHandler } from "../../services/actions/actions";

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIngredientsData());
  }, [dispatch]);

  const { bun, content, drcontent } = useSelector((store) => ({
    bun: store.data.burgerIngredients.bun,
    content: store.data.burgerIngredients.otherIngredients,
    // drcontent: store.drop.burgerIngredients.otherIngredients
  }));

  console.log(drcontent);

  const dropHandler = (item) => { dispatch(onDropHandler(item)) };

  const [{ isHover }, dropTarget] = useDrop(()=> ({
    accept: "ingredient",
    drop: (item) => { 
      dropHandler(item)
    },
    collect: (monitor) => ({
      isHover: !!monitor.isOver(),
    })
  })
  );

  const orderNum = useSelector((store) => store.ord.orderNum);
  const modalOpen = useSelector((store) => store.ord.isModalOpen);

  const bunIdArr = [`${bun._id}`];
  bunIdArr.push(`${bun._id}`);
  const orderData = Array.from(content.map((el) => el._id)).concat(bunIdArr);

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
    let total = 0 + bun.price * 2;
    total = content.reduce(function(acc, obj) {
      return acc + obj.price;
    }, total);
    setTotalPrice(total);
  }, [totalPrice, setTotalPrice]);

  return (
    <>
      <div className={styles.components} ref={dropTarget}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bun.name + " (верх)"}
          price={bun.price}
          thumbnail={bunimg}
        />
        <ul className={styles.componentlist}>
          {content.map((item, index) => (
            <li key={index} className={styles.component}>
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                isLocked={false}
              />
            </li>
          ))} 
          {/* {drcontent.map((item, index) => (
            <li key={index} className={styles.component}>
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                isLocked={false}
              />
            </li>
          ))} */}
        </ul>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={bun.name + " (низ)"}
          price={bun.price}
          thumbnail={bunimg}
        />
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
