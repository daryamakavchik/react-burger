import React, { FC } from "react";
import styles from "./orderinfo.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from '../services/actions/auth';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { selectOrderAction } from "../services/actions/feed";
import { editDate } from "../utils/functions";
import { wsConnectionStartAction, wsConnectionClosedAction } from "../services/actions/ws";
import { getCookie } from "../services/actions/auth";
import { RootState } from "../services/store";


export type TIngredientDataArray = {
  data: TIngredientData[]
}
export type TIngredientData = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  count: number
}

export const OrderInfoPage:FC<TIngredientDataArray> = (data:TIngredientDataArray) => {
  const dispatch = useDispatch();
  const [orderIngredients, setOrderIngredients] = useState<TIngredientData[] | null>(null);
  const { id } = useParams<{ id?: string }>();
  const { url } = useRouteMatch();
  const [price, setPrice] = useState(0);
  const { currentOrder } = useSelector((store:RootState) => store.feed);
  const { orders } = useSelector((store:RootState) => store.ws);
  const done = currentOrder?.status === "done";
  const dateString = editDate(currentOrder?.createdAt);
  const token = getCookie('token');
  const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
  const wsAuthUrl = `wss://norma.nomoreparties.space/orders` + `?token=${token}`;

  let ingrData;
  let ingredients;
  
  ingredients = currentOrder?.ingredients;
  
  const uniqueArr = [...(ingredients !== undefined ? ingredients : []).reduce( (mp, ingr) => {
    if (!mp.has(ingr)) 
      mp.set(ingr, { ingr, count: 0 });
      mp.get(ingr).count++;
    return mp;
  }, new Map).values()];  

  useEffect(() => {
    url === `/profile/orders/${id}` ? dispatch(wsConnectionStartAction(wsAuthUrl)) : dispatch(wsConnectionStartAction(wsUrl));
    return () => {
      dispatch(wsConnectionClosedAction());
    };
  }, [dispatch]);


  useEffect(() => {
    const order = orders.orders.find((order) => order._id === id!);
    order && dispatch(selectOrderAction(order));
  }, [currentOrder, id, orders, dispatch]);

  useEffect(() => {
    if (data.data.length && uniqueArr) {
      let totalPrice = 0;
      let targetIngredients = [];
      let bun = false;
      uniqueArr.forEach((ingredient) => {
        ingrData = data.data.find((el:TIngredientData) => el._id === ingredient.ingr);
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

  return (
    <div className={styles.content}>
      <p className={`${styles.ordernum} ${styles.id} text text_type_digits-default`}>
        #{currentOrder?.number}
      </p>
      <p
        className={`${styles.burgername} text text_type_main-default`}
      >
        {currentOrder?.name}
      </p>
      <p className={`${styles.subtext} text text_type_main-small`}>
        {done ? "Выполнен" : "Готовится"}
      </p>
      <div className={styles.ingredientsblock}>
        <p className={`${styles.subtitle} text text_type_main-default`}>
          Состав:
        </p>
        <ul className={styles.ingredients}>
          {uniqueArr && uniqueArr.map((ingr) => (
            <li className={ingr.ingr === null ? styles.null : styles.ingredient} key={ingr.ingr}>
              <div className={styles.imgcontainer}>
                <img className={styles.img}
                src={ingr && ingr.ingr && data && (data?.data.find((el:TIngredientData) => el._id === ingr.ingr)!).image} />
                </div>
              <div className={styles.text}>
                <p className={`${styles.textname} text text_type_main-default`}>
                  {ingr && ingr.ingr && data && (data.data.find((el:TIngredientData) => el._id === ingr.ingr)!).name}
                </p>
                <p
                  className={`${styles.id} ${styles.smallprice} text text_type_digits-default`}
                >
                  {ingr.count} x{" "}
                  {ingr && ingr.ingr && data && (data.data.find((el:TIngredientData) => el._id === ingr.ingr)!).price}
                </p>
              </div>
              <div className={styles.price}>
                <CurrencyIcon type='primary'/>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.footer}>
          <p
            className={`${styles.timestamp} text text_type_main-small text_color_inactive`}
          >
            {dateString}
          </p>
          <div className={styles.price}>
            <p
              className={`${styles.id} ${styles.footerprice} text text_type_digits-default`}
            >
              {price}
            </p>
            <CurrencyIcon type='primary'/>
          </div>
        </div>
      </div>
    </div>
  );
}
