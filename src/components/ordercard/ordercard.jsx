import React from 'react';
import styles from '../../pages/feed.module.css';
import preview from "../../images/ingredientpreview.png";
import preview2 from "../../images/ingredientpreview2.png";
import preview3 from "../../images/ingredientpreview3.png";
import preview4 from "../../images/ingredientpreview4.png";
import preview5 from "../../images/ingredientpreview5.png";
import { useRouteMatch } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { selectOrderAction } from "../../services/actions/feed";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';

export default function OrderCard({order}){
  const dispatch = useDispatch();
  const location = useLocation();
  const { url } = useRouteMatch();
  const { number, ingredients, createdAt, name, _id, status } = order;
  const date = 'someDate';
  const cost = React.useMemo(
    () => ingredients.reduce((acc, cur) => acc + cur.price * cur.quantity, 0),
    [ingredients]
  );

    return (
        <li
        className={styles.order}
        onClick={() => dispatch(selectOrderAction(order))}
      >
        <Link
          to={{ pathname: `${url}/${_id}`, state: { orderCard: location } }}
        >
          <div className={styles.orderid}>
            <p
              className={`${styles.id} text text_type_digits-default`}
            >{`#${number}`}</p>
            <p
              className={`${styles.timestamp} text text_type_main-small text_color_inactive`}
            >
              {date}
            </p>
          </div>
          <h3
            className={`${styles.burgername} text text_type_main-default`}
          >
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
              <div className={styles.preview}>
                <div className={styles.illustration}>
                  <img src={preview} />
                </div>
              </div>
              <div className={styles.preview}>
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
              </div>
            </div>
            <div className={styles.price}>
              <p
                className={`${styles.digit} text text_type_digits-default`}
              >
                480
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </Link>
      </li>
    )
}