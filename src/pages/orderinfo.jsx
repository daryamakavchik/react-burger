import React from "react";
import styles from "./orderinfo.module.css";
import styless from "./feed.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { selectOrderAction } from "../services/actions/feed";
import { wsConnectionStartAction, wsConnectionClosedAction, wsConnectionGetOrdersAction } from "../services/actions/ws";

export default function OrderInfoPage(data) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { url } = useRouteMatch();
  const[price, setPrice] = useState(0);
  const[count, setCount] = useState(0);
  const { currentOrder } = useSelector((store) => store.feed);
  const { orders } = useSelector((store) => store.ws);

  let ingrData;
  data = data.data;
  console.log(orders);

  React.useEffect(() => {
    if (currentOrder === null) {
      const order = orders.find((order) => order._id === id);
      console.log(order);
      order && dispatch(selectOrderAction(order));
      console.log('ss');
    }
  }, [currentOrder, id, orders, dispatch]);

  const number = currentOrder?.number;
  const name = currentOrder?.name;
  const status = currentOrder?.status;
  let ingredients = currentOrder?.ingredients;
  const createdAt = currentOrder?.createdAt;
  console.log(currentOrder);
  const done = status === 'done';
  ingredients = url === `/profile/orders/${id}` ? (ingredients.map((ing) => ing._id !== undefined ? ing._id : ing)) : ingredients;

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

 const uniqueArr = ingredientsWithCount(ingredients);

  useEffect(() => {
    if (data.length) {
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
 
 const dateString = editDate(currentOrder.createdAt);
 


  return (
    <div className={styles.content}>
      <p className={`${styless.id} ${styles.id} text text_type_digits-default`}>
        #{number}
      </p>
      <p
        className={`${styless.burgername} ${styles.burgername} text text_type_main-default`}
      >
        {name}
      </p>
      <p className={`${styles.subtext} text text_type_main-small`}>
      {done ? 'Выполнен' :'Готовится'}
      </p>
      <div className={styles.ingredientsblock}>
        <p className={`${styless.subtitle} text text_type_main-default`}>
          Состав:
        </p>
        <ul className={styles.ingredients}>
          {uniqueArr.map((ingr, i) => (
            <li className={styles.ingredient} key={i}>
              <div className={styles.img} 
              style={{ backgroundImage: `url(${(data.find((el) => el._id === ingr.ingr)).image})` }}
              />
              <div className={styles.text}>
                <p className={`${styles.textt} text text_type_main-default`}>
                  { url === `/feed/${id}` ? (data.find((el) => el._id === ingr.ingr)).name : (data.find((el) => el._id === ingr.ingr)).name }
                </p>
                <div className={styles.price}>
                  <p
                    className={`${styless.id} ${styles.smallprice} text text_type_digits-default`}
                  >
                  {ingr.count} x {(data.find((el) => el._id === ingr.ingr)).price}
                  </p>
                  <CurrencyIcon />
                </div>
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
              className={`${styless.id} ${styles.smallprice} text text_type_digits-default`}
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
