import React, { useEffect, useState, FC, PropsWithChildren, SyntheticEvent} from "react";
import { useDispatch, useSelector } from '../../services/actions/auth';
import { useHistory } from "react-router-dom";
import { useDrop } from "react-dnd";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import styles from "./burger-constructor.module.css";
import {
  onDropHandler,
  deleteItem,
  TIngredientData
} from "../../services/actions";
import { openOrderModal, closeOrderModal } from "../../services/actions/order";
import { BurgerElement } from "../burger-element/burger-element";
import { Loader } from "../loader/loader";
import { RootState } from "../../services/store";


// type Props = {
//   children?: React.ReactNode
//   type?: "secondary" | "primary" | undefined;
//     size?: "small" | "medium" | "large" | undefined;
//     onClick?: (() => void) | ((e: SyntheticEvent) => void) | undefined;
//     disabled?: boolean | undefined;
//     name?: string | undefined;
//     htmlType?: "button" | undefined;
// };

// export function Button({children}: Props) {
//   return (
//     <>{children}</>
//   )
// }

export const BurgerConstructor:FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [totalPrice, setTotalPrice] = useState(0);
  const userName = useSelector((store:RootState) => store.user.user.name);
  const isLoading = useSelector((store:RootState) => store.ord.isLoading);
  const modalOpen = useSelector((store:RootState) => store.ord.isModalOpen);

  const { bun, content } = useSelector((store:RootState) => ({
    bun: store.constr.burgerIngredients.bun,
    content: store.constr.burgerIngredients.fillings,
  }));

  const dropHandler = (item:TIngredientData) => {
    onDropHandler(item);
  };
  const deleteHandler = (item:TIngredientData) => {
    dispatch(deleteItem(item));
  };

  const [, dropTarget] = useDrop(() => ({
    accept: "ingredient",
    drop: (item:any, monitor) => {
      dropHandler(item);
    },
  }));

  const bunsPrice = bun && bun.price * 2;
  const bunIdArr = bun && [`${bun._id}`];
  const orderData =
    bun &&
    content &&
    Array.from(content.map((el) => el._id))
      .concat(bunIdArr)
      .concat(bunIdArr);

  const openModal = () => {
      openOrderModal(orderData);
  };
  const redirectFunc = () => {
    history.replace({ pathname: "/login" });
  };

  const closeAllModals = () => {
    closeOrderModal();
  };

  let total =
    bun && bunsPrice
      ? content.reduce(function(acc, obj) {
          return acc + obj.price * obj.count;
        }, bunsPrice)
      : content.reduce(function(acc, obj) {
          return acc + obj.price * obj.count;
        }, 0);

  useEffect(() => {
    setTotalPrice(total);
  }, [total, totalPrice, setTotalPrice]);

  return (
    <>
      <div className={styles.components} ref={dropTarget}>
        {!bun && content.length === 0 && (
          <div className={styles.subtitle}>
            <p className="text text_type_main-medium">
              Пожалуйста, перенесите сюда булку и ингредиенты для создания
              заказа
            </p>
          </div>
        )}
        {!bun && content.length > 0 && (
          <p className={`${styles.subtitlebun} text text_type_main-medium`}>
            Осталось добавить булку{" "}
            <span role="img" aria-label="eyes">
              👀
            </span>
          </p>
        )}
        {bun && content.length === 0 && (
          <p className={`${styles.subtitlemain} text text_type_main-medium`}>
            Осталось добавить начинку{" "}
            <span role="img" aria-label="eyes">
              👀
            </span>
          </p>
        )}
        {bun && (
          <div className={styles.component}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name + " (верх)"}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
        <ul className={styles.componentlist}>
          {content.map(
            (item, index) =>
              item.count > 0 && (
                <BurgerElement
                  key={item.key}
                  item={item}
                  handleClose={() => deleteHandler(item)}
                  index={index}
                />
              )
          )}
        </ul>
        {bun && (
          <>
            <div className={styles.component}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={bun.name + " (низ)"}
                price={bun.price}
                thumbnail={bun.image}
              />
            </div>
          </>
        )}
        {content.length > 0 && bun && (
          <>
            <div className={styles.total}>
              <div className={styles.text}>
                <p className="text text_type_digits-medium">{total}</p>
              </div>
              <CurrencyIcon type="primary" />
              <div className={styles.button}>
                <Button
                  type="primary"
                  size="medium"
                  onClick={userName.length > 0 ? openModal : redirectFunc}
                >
                  {!isLoading ? "Оформить заказ" : "Загрузка..."}
                </Button>
              </div>
              <Loader />
            </div>
          </>
        )}
        {modalOpen && (
          <Modal onClose={closeAllModals}>
            <OrderDetails />
          </Modal>
        )}
      </div>
    </>
  );
}
