import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useModal } from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import bunimg from "../../images/bun-02.svg";

export default function BurgerConstructor({ data }) {
  const [Modal, setOpen] = useModal();

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
          thumbnail={bunimg}
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
          thumbnail={bunimg}
        />
        <div className={styles.total}>
          <div className={styles.text}>
            <p className="text text_type_digits-medium">5772</p>
          </div>
          <CurrencyIcon type="primary" />
          <div className={styles.button}>
            <Button type="primary" size="medium" onClick={() => setOpen(true)}>
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

const BurgerConstructorDataPropTypes = PropTypes.arrayOf(PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
}));

BurgerConstructor.propTypes = {
  data: BurgerConstructorDataPropTypes,
};
