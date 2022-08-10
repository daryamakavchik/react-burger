import React from "react";
import styles from "./orderinfo.module.css";
import styless from "./feed.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { selectOrderAction } from "../services/actions/feed";
import { wsConnectionStartAction, wsConnectionClosedAction, WS_GET_ORDERS } from "../services/actions/ws";
import { WS_AUTH_CONNECTION_START } from "../services/actions/wsauth";

export default function OrderInfoPage(data) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { url } = useRouteMatch();
  const[price, setPrice] = useState(0);
  const[count, setCount] = useState(0);
  const { currentOrder } = useSelector((store) => store.feed);
  const { orders } = useSelector((store) => store.ws);
  let ingrData;
  data = data.data;

  React.useEffect(() => {
    dispatch(wsConnectionStartAction('wss://norma.nomoreparties.space/orders/all'));
  }, [dispatch]);

  React.useEffect(() => {
      const order = orders.find((order) => order._id === id);
      order && dispatch(selectOrderAction(order));
  }, [currentOrder, id, orders, dispatch]);

const done = currentOrder?.status === 'done';
let ingredients;
let uniqueArr;
ingredients = url === `/profile/orders/${id}` ? (currentOrder?.ingredients.map((ing) => ing._id !== undefined ? ing._id : ing)) : currentOrder?.ingredients;

if (ingredients) {
    const ingredientsWithCount = (ingredients) => {
       const res = {};
       ingredients.forEach((ingr) => {
          if (!res[ingr]) {
             res[ingr] = { ingr, count: 0 };
          };
          res[ingr].count += 1;
       });
    return Object.values(res);
 };
 uniqueArr = ingredientsWithCount(ingredients);
}

  useEffect(() => {
    if (data.length && uniqueArr) {
      let totalPrice = 0;
      let targetIngredients = [];
      let bun = false;
      uniqueArr.forEach((ingredient) => { 
        ingrData = data.find((el) => el._id === ingredient.ingr);
        if (ingrData?.price) {
          targetIngredients.push(ingrData);
          if (ingrData.type === "bun" && !bun) {
            totalPrice += 2 * ingrData?.price;
            bun = true;
          }
          if (ingrData.type !== "bun") totalPrice += ingrData?.price;
        }
      });
      setPrice(totalPrice);
    }
  }, [data, ingredients]);

  const getDays = (days) => ( days === 0 ? 'Сегодня' : days === 1 ? 'Вчера' : days > 1 ? `${days} дня(-ей) назад` : 'Что-то пошло не так:(');
  const editDate = (date) => {
   const createdAt= new Date(date);
   const today = new Date();
   today.setHours(0, 0, 0, 0);
   const diffTime = Math.ceil((today.getTime() - createdAt.getTime()) / (60 * 60 * 24 * 1000));
   const hours = createdAt.getHours() > 9 ? createdAt.getHours() : `0${createdAt.getHours()}`
   const min = createdAt.getMinutes() > 9 ? createdAt.getMinutes() : `0${createdAt.getMinutes()}`
 
   return `${getDays(diffTime)}, ${hours}:${min} i-GMT+${createdAt.getTimezoneOffset() * (-1) / 60}`;
 };
 
 const dateString = editDate(currentOrder?.createdAt);

  return (
    <div className={styles.content}>
      <p className={`${styless.id} ${styles.id} text text_type_digits-default`}>
        #{currentOrder?.number}
      </p>
      <p
        className={`${styless.burgername} ${styles.burgername} text text_type_main-default`}
      >
        {currentOrder?.name}
      </p>
      <p className={`${styles.subtext} text text_type_main-small`}>
      {done ? 'Выполнен' :'Готовится'}
      </p>
      <div className={styles.ingredientsblock}>
        <p className={`${styless.subtitle} text text_type_main-default`}>
          Состав:
        </p>
        <ul className={styles.ingredients}>
          {uniqueArr?.map((ingr, i) => (
            <li className={styles.ingredient} key={i}>
              <div className={styles.img} 
              style={{ backgroundImage: `url(${data && (data.find((el) => el._id === ingr.ingr)).image})` }}
              />
              <div className={styles.text}>
                <p className={`${styles.textt} text text_type_main-default`}>
                  { data && (data.find((el) => el._id === ingr.ingr)).name }
                </p>
                <p
                    className={`${styless.id} ${styles.smallprice} text text_type_digits-default`}
                  >
                  {ingr.count} x {data && (data.find((el) => el._id === ingr.ingr)).price}
                  </p>
              </div>
              <div className={styles.price}>
                  <CurrencyIcon />
                </div>
            </li>
          ))}
        </ul>
        <div className={styles.footer}>
          <p
            className={`${styless.timestamp} text text_type_main-small text_color_inactive`}
          >
            {dateString}
          </p>
          <div className={styles.price}>
            <p
              className={`${styless.id} ${styles.footerprice} text text_type_digits-default`}
            >
              {price}
            </p>
            <CurrencyIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
