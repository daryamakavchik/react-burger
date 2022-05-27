import React from "react";
import styles from "./burger-constructor.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import bun from "../../images/bun-02.svg";
import ModalOverlay from "../modal-overlay/modal-overlay";

export default function BurgerConstructor({ data }) {
  const [isOpen, setState] = React.useState({ isOpen: false });

  function handleOpen() {
    setState({ isOpen: true });
  }
  const mainArr = data.filter((el) => el.type === "main");
  const ingredients = Array.from(mainArr);
  return (
    <>
      <div className={styles.components}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={data[0].price}
          thumbnail={bun}
        />
        <ul className={styles.componentlist}>
          {ingredients.map((item, index) => (
            <li key={index}>
              {" "}
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                isLocked={false}
              />{" "}
            </li>
          ))}
        </ul>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={data[data.length - 1].price}
          thumbnail={bun}
        />
        <div className={styles.total}>
          <div className={styles.text}>
            <p className="text text_type_digits-medium">5772</p>
          </div>
          <CurrencyIcon type="primary" />
          <div className={styles.button} onClick={handleOpen}>
            <Button type="primary" size="medium">
              Оформить заказ
            </Button>
          </div>
        </div>
        {isOpen ? mainArr.map((item, ind) => <ModalOverlay key={ind} props={item.image} /> ) : !isOpen}
      </div>
    </>
  );
}

BurgerConstructor.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
};
