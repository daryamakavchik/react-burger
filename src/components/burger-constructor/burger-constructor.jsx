import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useModal } from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.css";
import { propTypeCheck } from "../../utils/proptypes";
import bunimg from "../../images/bun-02.svg";

export default function BurgerConstructor({ data }) {
  const [Modal, openModal] = useModal();

  const mainArr = data.filter((el) => el.type === "main");
  const ingredients = Array.from(mainArr);
  const bunName = Array.from(data.filter((el) => el.type === "bun"))[0].name;

  return (
    <>
      <div className={styles.components}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bunName + ' (верх)'}
          price={data[0].price}
          thumbnail={bunimg}
        />
        <ul className={styles.componentlist}>
          {ingredients.map((item, index) => (
            <li key={index}>
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
          text={bunName + ' (низ)'}
          price={data[data.length - 1].price}
          thumbnail={bunimg}
        />
        <div className={styles.total}>
          <div className={styles.text}>
            <p className="text text_type_digits-medium">5772</p>
          </div>
          <CurrencyIcon type="primary" />
          <div className={styles.button}>
            <Button type="primary" size="medium" onClick={openModal}>
              Оформить заказ
            </Button>
          </div>
        </div>
        <Modal>
          <OrderDetails />
        </Modal>
      </div>
    </>
  );
}

propTypeCheck();