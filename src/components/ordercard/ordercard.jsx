import React from "react";
import styles from "../../pages/feed.module.css";
import { useRouteMatch } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { selectOrderAction } from "../../services/actions/feed";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function OrderCard({ order }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { url } = useRouteMatch();
  const data = useSelector((store) => store.data.data);
  let ingrData;

  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(0);
  const [images, setImages] = useState([]);
  const imageQuantity = 5;

  useEffect(() => {
    let bun = false;
    let targetImages = [];
    order.ingredients.forEach(ingredient => {
      url === '/feed' ? ingrData = data.find((el) => el._id === ingredient) : ingrData = data.find((el) => el._id === ingredient._id) ;
        if (ingredient.type === 'bun' && !bun) {
            bun = true;
            targetImages.push(ingrData.image);
        }
        if (ingredient.type !== 'bun') {
            targetImages.push(ingrData.image)
        }
    });
    setImages(targetImages);
    setCount(targetImages.length)
}, [order.ingredients]);

  useEffect(() => {
    if (data.length) {
      let totalPrice = 0;
      let targetIngredients = [];
      let bun = false;
      order.ingredients.forEach((ingr) => {
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
    }
  }, [data, order.ingredients]);
  
 const select = () => dispatch(selectOrderAction(order));

  return ( 
    <li className={styles.order} onClick={select}>
      <Link className={styles.link} to={{ pathname: `${url}/${order._id}`, state: { background: location } }} >
        <div className={styles.orderid}>
          <p className={`${styles.id} text text_type_digits-default`}>{`#${order.number}`}</p>
          <p className={`${styles.timestamp} text text_type_main-small text_color_inactive`}>{order.createdAt}</p>
        </div>
        <h3 className={`${styles.burgername} text text_type_main-default`}>{order.name}</h3>
        {url === "/profile/order" && (
          <p className={`text text_type_main-small ${order.status === "done" && styles.ready}`}>
            {order.status === "created" ? "Создан" : order.status === "pending" ? "Готовится" : "Выполнен"}
          </p>
        )}
        <div className={styles.componentandprice}>
          <div className={styles.ingredients}>
            {images.map((image, i) => {
              let left = -i * 15;
              if (i <= imageQuantity - 1)
                return (
                  <div key={uuidv4()} className={styles.container} style={{ left: left, zIndex: 100 - i }}>
                    <img className={styles.image} src={image} alt="" />
                  </div>
                );
              if (i === imageQuantity)
                return (
                  <div key={uuidv4()} className={styles.container} style={{ left: left, zIndex: 100 - i }}>
                    <p className={styles.count + " text text_type_digits-default"}>
                      {"+" + (count - imageQuantity + 1)}
                    </p>
                    <img className={styles.image} style={{ opacity: 0.5 }} src={image} alt="" />
                  </div>
                );
              return false;
            })}
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
