import React, { useContext, useEffect, useState } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerConstructorContext, OrderNumContext } from "../../services/BurgerConstructorContext";
import { apiPostOrder } from "../../utils/api";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.css";
import bunimg from "../../images/bun-02.svg";

export default function BurgerConstructor() {
  const { data } = useContext(BurgerConstructorContext);
  const [ totalPrice, setTotalPrice ] = useState(0);
  const [ orderNum, setOrderNum] = useState('');
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);

  const mainArr = data.filter((el) => el.type !== "bun");
  const ingredients = Array.from(mainArr);
  const bunArr = data.filter((el) => el.type === "bun");
  const bun = bunArr[0];
  const bunIdArr = [`${bunArr[0]._id}`]; bunIdArr.push(`${bunArr[0]._id}`);

  const orderData = Array.from(ingredients.map((el) => el._id)).concat( bunIdArr );

  const openModal = () => {
    setIsOrderDetailsOpened(true);
    apiPostOrder(orderData).then((res) => setOrderNum(res.order.number));
  };

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
    setOrderNum(null);
  };

  const handleEscKeydown = (event) => {
    event.key === "Escape" && closeAllModals();
  };

  useEffect(() => {
    let total = 0 + bun.price * 2;
    total = ingredients.reduce(function (acc, obj) { return acc + obj.price; }, total);
    setTotalPrice(total);
  }, [totalPrice, setTotalPrice]);

  return (
    <>
      <div className={styles.components}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bun.name + " (верх)"}
          price={bun.price}
          thumbnail={bunimg}
        />
        <ul className={styles.componentlist}>
          {ingredients.map((item, index) => (
            <li
              key={index}
              className={styles.component}
            >
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                isLocked={false}
              />
            </li>
          ))}
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
        {isOrderDetailsOpened && (
          <Modal
            onOverlayClick={closeAllModals}
            onEscKeyDown={handleEscKeydown}
          >
              <OrderNumContext.Provider value={orderNum}>
                <OrderDetails />
              </OrderNumContext.Provider>
          </Modal>
        )}
      </div>
    </>
  );
}