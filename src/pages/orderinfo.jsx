import React from 'react';
import styles from './orderinfo.module.css';
import styless from './feed.module.css';
import preview from '../images/ingredientpreview.png';
import preview2 from '../images/ingredientpreview2.png';
import preview3 from '../images/ingredientpreview3.png';
import preview4 from '../images/ingredientpreview4.png';
import { getOrder, getUserOrder } from '../services/actions/order';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function OrderInfoPage(){
    const dispatch = useDispatch();
    const isProfile = !!useRouteMatch("/profile");
    const { id } = useParams();
    useEffect(
      () => {
        dispatch(isProfile
          ? getUserOrder(id)
          : getOrder(id)
        )
      },
      [dispatch, isProfile, id]
    );
    const order = useSelector((store) => store.ord.currentOrder);
    const { allIngredients } = useSelector((store) => store.data.data);
    const getBurgerIngredients = (arrIdBurgerIngredients, arrAllIngredients) => (
        arrIdBurgerIngredients?.map((id) => (
          arrAllIngredients.filter((item) => item._id === id))))?.flat();
          const getBurgerIngredientsObjWithCount = (arr) => arr?.reduce((acc, curr) => {
            const id = curr._id
            acc.item[id] = curr;
            acc.count[id] = (acc.count[id] || 0) + 1
            return acc
          }
            , { item: {}, count: {} })
      
    const burgerIngredients = order && order.ingredients && getBurgerIngredients(order?.ingredients, allIngredients);
    const bI = burgerIngredients && getBurgerIngredientsObjWithCount(burgerIngredients);
    const ing = Array.from(new Set(order?.ingredients))

    return (
        <div className={styles.content}>
            <p className={`${styless.id} ${styles.id} text text_type_digits-default`}>#{order.number}</p>
            <p className={`${styless.burgername} ${styles.burgername} text text_type_main-default`}>{order.name}</p>
            <p className={`${styles.subtext} text text_type_main-small`}>{order.status}</p>
            <div className={styles.ingredientsblock}>
                <p className={`${styless.subtitle} text text_type_main-default`}>Состав:</p>
                <ul className={styles.ingredients}>
                    { ing.map((el, i) => (
                    <li className={styles.ingredient} key={i}>
                        <img src={bI?.item[el]?.image} className={styles.img} />
                        <div className={styles.text}><p className={`${styles.textt} text text_type_main-default`}>{bI?.item[el]?.name}</p>
                            <div className={styles.price}>
                                <p className={`${styless.id} ${styles.smallprice} text text_type_digits-default`}>2 x 20</p>
                                <CurrencyIcon />
                            </div>
                        </div>
                    </li>
                    ))}
                </ul>
                <div className={styles.footer}>
                    <p className={`${styless.timestamp} text text_type_main-small text_color_inactive`}>Вчера, 13:50 i-GMT+3</p>
                    <div className={styles.price}>
                        <p className={`${styless.id} ${styles.smallprice} text text_type_digits-default`}>510</p>
                        <CurrencyIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}