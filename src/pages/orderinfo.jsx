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

export default function OrderInfoPage() {
  const dispatch = useDispatch();
  const { currentOrder } = useSelector((state) => state.feed);
  const data = useSelector((store) => store.data.data);
  const { id } = useParams();
  const { url } = useRouteMatch();
  const[price, setPrice] = useState(0);
  const[count, setCount] = useState(0);

  let ingrData;

  const number = currentOrder?.number;
  const name = currentOrder?.name;
  const status = currentOrder?.status;
  let ingredients = currentOrder?.ingredients;
  const createdAt = currentOrder?.createdAt;

  const done = status === 'one';
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
 console.log(uniqueArr);

  useEffect(() => {
    if (data.length) {
      let totalPrice = 0;
      let targetIngredients = [];
      let bun = false;
      uniqueArr.forEach((ingr) => { 
        ingrData = data.find((el) => el._id === ingr.ingr);
        console.log(ingrData);
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
              <div className={styles.img} style={{ backgroundImage: `url(${(data.find((el) => el._id === ingr.ingr)).image})` }}/>
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
            Вчера, 13:50 i-GMT+3
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
