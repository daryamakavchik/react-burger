import React, { useContext, useReducer, useEffect } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.css";
import { ArrayPropTypes } from "../../utils/proptypes";
import bunimg from "../../images/bun-02.svg";
import Modal from "../modal/modal";
import {
  BurgerConstructorContext,
  TotalPriceContext,
} from "../../services/BurgerConstructorContext";
import { apiPostOrder } from "../../utils/api";

export default function BurgerConstructor() {
  const { data } = useContext(BurgerConstructorContext);
  const { totalPrice, setTotalPrice } = useContext(TotalPriceContext);

  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);

  const postOrder = (orderData) => {
    apiPostOrder(orderData).then((res) => console.log(res));
  };

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
  };

  const handleEscKeydown = (event) => {
    event.key === "Escape" && closeAllModals();
  };

  const mainArr = data.filter((el) => el.type !== "bun");
  const ingredients = Array.from(mainArr);

  const bunArr = data.filter((el) => el.type === "bun");
  const bun = bunArr[0];
  const bunIdArr = [`${bunArr[0]._id}`];
  bunIdArr.push(`${bunArr[0]._id}`);

  const orderData = Array.from(ingredients.map((el) => el._id)).concat(
    bunIdArr
  );

  const openModal = () => {
    setIsOrderDetailsOpened(true);
    postOrder(orderData);
  };

  useEffect(() => {
    let total = 0 + bun.price * 2;
    ingredients.map((item) => (total += item.price));
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
              style={{ minWidth: 488 }}
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
            <OrderDetails />
          </Modal>
        )}
      </div>
    </>
  );
}

BurgerConstructor.propTypes = {
  data: ArrayPropTypes,
};
