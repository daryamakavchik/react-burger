import React, { useEffect, useState, FC} from "react";
import { useDispatch, useSelector } from '../../services/store';
import { useHistory } from "react-router-dom";
import { useDrop } from "react-dnd";

import { CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "../../../node_modules/@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { BurgerElement } from "../burger-element/burger-element";
import { Loader } from "../loader/loader";

import { onDropHandler, deleteItem} from "../../services/actions";
import { openOrderModal, closeOrderModal } from "../../services/actions/order";
import { TIngredientData } from "../../utils/types";
import styles from "./burger-constructor.module.css";

export const BurgerConstructor:FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [totalPrice, setTotalPrice] = useState(0);
  const userName = useSelector((store) => store.user.user.name);
  const isLoading = useSelector((store) => store.ord.isLoading);
  const modalOpen = useSelector((store) => store.ord.isModalOpen);

  const { bun, content } = useSelector((store) => ({
    bun: store.constr.burgerIngredients.bun,
    content: store.constr.burgerIngredients.fillings,
  }));

  const dropHandler = (item:TIngredientData) => {
    dispatch(onDropHandler(item));
  };
  const deleteHandler = (item:TIngredientData) => {
    dispatch(deleteItem(item));
  };

  const [{ isOver, canDrop }, dropTarget] = useDrop(() => ({
    accept: "ingredient",
    drop: (item:TIngredientData) => {
      dropHandler(item);
    },
    collect: monitor => ({ isOver: monitor.isOver(), canDrop: monitor.canDrop() }),
  }));

  const bunsPrice = bun && bun.price * 2;
  const bunIdArr = bun && [`${bun._id}`];
  const orderData =
    bun &&
    content &&
    Array.from(content.map((el) => el._id))
      .concat(bunIdArr!)
      .concat(bunIdArr!);

  const openModal = () => {
      dispatch(openOrderModal(orderData!));
  };
  const redirectFunc = () => {
    history.replace({ pathname: "/login" });
  };

  const closeAllModals = () => {
    dispatch(closeOrderModal());
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
              Make sure to drag a bun and fillings here
            </p>
          </div>
        )}
        {!bun && content.length > 0 && (
          <p className={`${styles.subtitlebun} text text_type_main-medium`}>
            Please add a bun{" "}
            <span role="img" aria-label="eyes">
              👀
            </span>
          </p>
        )}
        {bun && content.length === 0 && (
          <p className={`${styles.subtitlemain} text text_type_main-medium`}>
            Please add some fillings{" "}
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
              text={bun.name + " (top)"}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
        <ul className={`${styles.componentlist}`}>
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
                text={bun.name + " (bottom)"}
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
                  htmlType="button"
                  size="medium"
                  onClick={userName.length > 0 ? openModal : redirectFunc}
                >
                  {!isLoading ? "Create an order" : "Loading..."}
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
