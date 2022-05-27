import React from "react";
import styles from "./burger-constructor.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import buntwo from "../../images/bun-02 2.svg";
import sauceone from "../../images/sauce-03 2.svg";
import meat from "../../images/meat-02.svg";
import fruit from "../../images/sp 1.svg";
import rings from "../../images/mineral rings.svg";

interface BurgerConstructorData {
  name: string;
  price: number;
}

interface BurgerConstructorProps {
  data: BurgerConstructorData[];
}

export default function BurgerConstructor({ data }: BurgerConstructorProps) {
  return (
    <>
      <div className={styles.components}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={data[14].price}
          thumbnail={buntwo}
        />
        <div className={styles.componentlist}>
          <ConstructorElement
            text={data[3].name}
            price={data[3].price}
            thumbnail={sauceone}
          />
          <ConstructorElement
            text={data[4].name}
            price={data[4].price}
            thumbnail={meat}
          />
          <ConstructorElement
            text={data[7].name}
            price={data[7].price}
            thumbnail={fruit}
          />
          <ConstructorElement
            text={data[8].name}
            price={data[8].price}
            thumbnail={rings}
          />
          <ConstructorElement
            text={data[8].name}
            price={data[8].price}
            thumbnail={rings}
          />
          <ConstructorElement
            text={data[8].name}
            price={data[8].price}
            thumbnail={rings}
          />
          <ConstructorElement
            text={data[8].name}
            price={data[8].price}
            thumbnail={rings}
          />
        </div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={data[14].name}
          price={data[14].price}
          thumbnail={buntwo}
        />
        <div className={styles.total}>
          <div className={styles.text}>
            <p className="text text_type_digits-medium">
              {data[14].price +
                data[3].price +
                data[4].price +
                data[7].price +
                data[8].price * 4 +
                data[14].price}
            </p>
          </div>
          <CurrencyIcon type="primary" />
          <div className={styles.button}>
            <Button type="primary" size="medium">
              Оформить заказ
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
