import React from "react";
import styles from "../../pages/feed.module.css";
import preview from "../../images/ingredientpreview.png";
import preview2 from "../../images/ingredientpreview2.png";
import preview3 from "../../images/ingredientpreview3.png";
import preview4 from "../../images/ingredientpreview4.png";
import preview5 from "../../images/ingredientpreview5.png";
import { useRouteMatch } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { selectOrderAction } from "../../services/actions/feed";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export default function OrderCard({ order }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { url } = useRouteMatch();

  const { ingredients, name, _id, status, number, createdAt, updatedAt } =
    order;
  const data = useSelector((store) => store.data.data);
  let ingrData;

  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (data.length) {
      let totalPrice = 0;
      let targetIngredients = [];
      let bun = false;
      ingredients.forEach((ingr) => {
        ingrData = data.find((el) => el._id === ingr);
        if (ingrData?.price) {
          targetIngredients.push(ingrData);
          if (ingrData.type === "bun" && !bun) {
            totalPrice += 2 * ingrData.price;
            bun = true;
          }
          if (ingrData.type !== "bun") totalPrice += ingrData.price;
        }
      });
      setPrice(totalPrice);
      // setOrderIngredients(targetIngredients);
    }
  }, [data, order.ingredients]);

  // const cost = React.useMemo(() => ingredients.reduce((acc, cur) =>  acc + ingrData.price * ingrCount, 0), [ingredients]); //works incorectly
  // ingrCount = ingredients.filter(x => x === ingrData._id).length;

  return (
    <li
      className={styles.order}
      onClick={() => dispatch(selectOrderAction(order))}
    >
      <Link
        className={styles.link}
        to={{ pathname: `${url}/${_id}`, state: { orderCard: location } }}
      >
        <div className={styles.orderid}>
          <p
            className={`${styles.id} text text_type_digits-default`}
          >{`#${number}`}</p>
          <p
            className={`${styles.timestamp} text text_type_main-small text_color_inactive`}
          >
            {createdAt}
          </p>
        </div>
        <h3 className={`${styles.burgername} text text_type_main-default`}>
          {name}
        </h3>
        {url === "/profile/order" && (
          <p
            className={`text text_type_main-small ${
              status === "done" && styles.ready
            }`}
          >
            {status === "created"
              ? "Создан"
              : status === "pending"
              ? "Готовится"
              : "Выполнен"}
          </p>
        )}
        <div className={styles.componentandprice}>
          <div className={styles.ingredients}>
            {ingredients.map((ingr) => (
              <div className={styles.container}>
                <img
                  className={styles.image}
                  src={data.find((el) => el._id === ingr).image}
                />
              </div>
            ))}
            {/* <div className={styles.preview}>
                <div className={styles.illustration}>
                  <img src={preview2} />
                </div>
              </div>
              <div className={styles.preview}>
                <div className={styles.illustration}>
                  <img src={preview3} />
                </div>
              </div>
              <div className={styles.preview}>
                <div className={styles.illustration}>
                  <img src={preview4} />
                </div>
              </div>
              <div className={styles.preview}>
                <div className={styles.illustration}>
                  <img src={preview5} />
                </div>
              </div> */}
          </div>
          <div className={styles.price}>
            <p className={`${styles.digit} text text_type_digits-default`}>
              {price}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </Link>
    </li>
  );
}
