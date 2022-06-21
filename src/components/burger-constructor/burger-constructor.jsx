import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderNumContext } from "../../services/BurgerConstructorContext";
import { apiPostOrder } from "../../utils/api";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.css";
import bunimg from "../../images/bun-02.svg";
import { setIngredientsData } from '../../services/actions/actions';

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(setIngredientsData()) }, [dispatch]);   // Api request to set ingredients
  const { bun, content, count } = useSelector(store => ({bun: store.data.constructorData.bun, content: store.data.constructorData.content}));
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
  const [ totalPrice, setTotalPrice ] = useState(0);
  const [ orderNum, setOrderNum] = useState('');

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
    total = content.reduce(function (acc, obj) { return acc + obj.price; }, total);
    setTotalPrice(total);
  }, [totalPrice, setTotalPrice]);

  const bunIdArr = [`${bun._id}`]; bunIdArr.push(`${bun._id}`);
  const orderData = Array.from(content.map((el) => el._id)).concat( bunIdArr );


  // const mainArr = data.filter((el) => el.type !== "bun");
  // const ingredients = Array.from(mainArr);
  // const bunArr = data.filter((el) => el.type === "bun");
  // // const bun = bunArr[0];



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
          {content.map((item, index) => (
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