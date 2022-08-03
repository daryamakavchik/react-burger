import React from 'react';
import styles from './order.module.css';
import styless from './feed.module.css';
import preview from '../images/ingredientpreview.png';
import preview2 from '../images/ingredientpreview2.png';
import preview3 from '../images/ingredientpreview3.png';
import preview4 from '../images/ingredientpreview4.png';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function OrderPage(){
    return (
        <div className={styles.content}>
            <p className={`${styless.id} ${styles.id} text text_type_digits-default`}>#034533</p>
            <p className={`${styless.burgername} ${styles.burgername} text text_type_main-default`}>Black Hole Singularity острый бургер</p>
            <p className={`${styles.subtext} text text_type_main-small`}>Выполнен</p>
            <div className={styles.ingredientsblock}>
                <p className={`${styless.subtitle} text text_type_main-default`}>Состав:</p>
                <ul className={styles.ingredients}>
                    <li className={styles.ingredient}>
                        <img src={preview} className={styles.img} />
                        <div className={styles.text}><p className={`${styles.textt} text text_type_main-default`}>Флюоресцентная булка R2-D3</p>
                            <div className={styles.price}>
                                <p className={`${styless.id} ${styles.smallprice} text text_type_digits-default`}>2 x 20</p>
                                <CurrencyIcon />
                            </div>
                        </div>
                    </li>
                    <li className={styles.ingredient}>
                        <img src={preview2} className={styles.img} />
                        <div className={styles.text}><p className={`${styles.textt} text text_type_main-default`}>Филе Люминесцентного тетраодонтимформа</p>
                        <div className={styles.price}>
                            <p className={`${styless.id} ${styles.smallprice} text text_type_digits-default`}>1 x 300</p>
                            <CurrencyIcon />
                        </div>
                        </div>
                    </li>
                    <li className={styles.ingredient}>
                        <img src={preview3} className={styles.img}/>
                        <div className={styles.text}><p className={`${styles.textt} text text_type_main-default`}>Соус традиционный галактический</p>
                        <div className={styles.price}>
                            <p className={`${styless.id} ${styles.smallprice} text text_type_digits-default`}>1 x 30</p>
                                <CurrencyIcon />
                        </div>
                        </div>
                    </li>
                    <li className={styles.ingredient}>
                        <img src={preview4} className={styles.img}/>
                        <div className={styles.text}><p className={`${styles.textt} text text_type_main-default`}>Плоды фалленианского дерева</p>
                        <div className={styles.price}>
                            <p className={`${styless.id} ${styles.smallprice} text text_type_digits-default`}>1 x 80</p>
                            <CurrencyIcon />
                        </div>
                        </div>
                    </li>
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