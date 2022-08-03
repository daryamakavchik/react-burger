import React from 'react';
import styles from './feed.module.css';
import preview from '../images/ingredientpreview.png';
import preview2 from '../images/ingredientpreview2.png';
import preview3 from '../images/ingredientpreview3.png';
import preview4 from '../images/ingredientpreview4.png';
import preview5 from '../images/ingredientpreview5.png';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export function FeedPage(){
    return (
        <>
            <h2 className={`${styles.title} text text_type_main-large`}>Лента заказов</h2>
            <div className={styles.content}>
                <ul className={styles.orders}>
                    <li className={styles.order}>
                        <div className={styles.orderid}>
                            <p className={`${styles.id} text text_type_digits-default`}>#034535</p>
                            <p className={`${styles.timestamp} text text_type_main-small text_color_inactive`}>Сегодня, 16:20 i-GMT+3</p>
                        </div>
                        <h3 className={`${styles.burgername} text text_type_main-default`}>Death Star Starship Main бургер</h3>
                        <div className={styles.componentandprice}>
                            <div className={styles.ingredients}>
                                <div className={styles.preview}><div className={styles.illustration}><img src={preview} /></div></div>
                                <div className={styles.preview}><div className={styles.illustration}><img src={preview2} /></div></div>
                                <div className={styles.preview}><div className={styles.illustration}><img src={preview3} /></div></div>
                                <div className={styles.preview}><div className={styles.illustration}><img src={preview4} /></div></div>
                                <div className={styles.preview}><div className={styles.illustration}><img src={preview5} /></div></div>
                            </div>
                            <div className={styles.price}>
                                <p className={`${styles.digit} text text_type_digits-default`}>480</p>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    </li>
                    <li className={styles.order}>
                        <div className={styles.orderid}>
                            <p className={`${styles.id} text text_type_digits-default`}>#034535</p>
                            <p className={`${styles.timestamp} text text_type_main-small text_color_inactive`}>Сегодня, 16:20 i-GMT+3</p>
                        </div>
                        <h3 className={`${styles.burgername} text text_type_main-default`}>Death Star Starship Main бургер</h3>
                        <div className={styles.componentandprice}>
                            <div className={styles.ingredients}>
                                <div className={styles.preview}><div className={styles.illustration}><img src={preview} /></div></div>
                                <div className={styles.preview}><div className={styles.illustration}><img src={preview2} /></div></div>
                                <div className={styles.preview}><div className={styles.illustration}><img src={preview3} /></div></div>
                                <div className={styles.preview}><div className={styles.illustration}><img src={preview4} /></div></div>
                                <div className={styles.preview}><div className={styles.illustration}><img src={preview5} /></div></div>
                            </div>
                            <div className={styles.price}>
                                <p className={`${styles.digit} text text_type_digits-default`}>480</p>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    </li>
                    <li className={styles.order}>
                        <div className={styles.orderid}>
                            <p className={`${styles.id} text text_type_digits-default`}>#034535</p>
                            <p className={`${styles.timestamp} text text_type_main-small text_color_inactive`}>Сегодня, 16:20 i-GMT+3</p>
                        </div>
                        <h3 className={`${styles.burgername} text text_type_main-default`}>Death Star Starship Main бургер</h3>
                        <div className={styles.componentandprice}>
                            <div className={styles.ingredients}>
                                <div className={styles.preview}><div className={styles.illustration}><img src={preview} /></div></div>
                                <div className={styles.preview}><div className={styles.illustration}><img src={preview2} /></div></div>
                                <div className={styles.preview}><div className={styles.illustration}><img src={preview3} /></div></div>
                                <div className={styles.preview}><div className={styles.illustration}><img src={preview4} /></div></div>
                                <div className={styles.preview}><div className={styles.illustration}><img src={preview5} /></div></div>
                            </div>
                            <div className={styles.price}>
                                <p className={`${styles.digit} text text_type_digits-default`}>480</p>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    </li>
                    <li className={styles.order}>
                        <div className={styles.orderid}>
                            <p className={`${styles.id} text text_type_digits-default`}>#034535</p>
                            <p className={`${styles.timestamp} text text_type_main-small text_color_inactive`}>Сегодня, 16:20 i-GMT+3</p>
                        </div>
                        <h3 className={`${styles.burgername} text text_type_main-default`}>Death Star Starship Main бургер</h3>
                        <div className={styles.componentandprice}>
                            <div className={styles.ingredients}>
                                <div className={styles.preview}><div className={styles.illustration}><img src={preview} /></div></div>
                                <div className={styles.preview}><div className={styles.illustration}><img src={preview2} /></div></div>
                                <div className={styles.preview}><div className={styles.illustration}><img src={preview3} /></div></div>
                                <div className={styles.preview}><div className={styles.illustration}><img src={preview4} /></div></div>
                                <div className={styles.preview}><div className={styles.illustration}><img src={preview5} /></div></div>
                            </div>
                            <div className={styles.price}>
                                <p className={`${styles.digit} text text_type_digits-default`}>480</p>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    </li>
                    <li className={styles.order}>
                        <div className={styles.orderid}>
                            <p className={`${styles.id} text text_type_digits-default`}>#034535</p>
                            <p className={`${styles.timestamp} text text_type_main-small text_color_inactive`}>Сегодня, 16:20 i-GMT+3</p>
                        </div>
                        <h3 className={`${styles.burgername} text text_type_main-default`}>Death Star Starship Main бургер</h3>
                        <div className={styles.componentandprice}>
                            <div className={styles.ingredients}>
                                <div className={styles.preview}><div className={styles.illustration}><img src={preview} /></div></div>
                                <div className={styles.preview}><div className={styles.illustration}><img src={preview2} /></div></div>
                                <div className={styles.preview}><div className={styles.illustration}><img src={preview3} /></div></div>
                                <div className={styles.preview}><div className={styles.illustration}><img src={preview4} /></div></div>
                                <div className={styles.preview}><div className={styles.illustration}><img src={preview5} /></div></div>
                            </div>
                            <div className={styles.price}>
                                <p className={`${styles.digit} text text_type_digits-default`}>480</p>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    </li>
                </ul>
                <div className={styles.completed}>
                    <div className={styles.types}>
                        <div className={styles.type}>
                            <p className={`${styles.subtitle} text text_type_main-default`}>Готовы:</p>
                            <p className={`${styles.digits} text text_type_digits-default`}>034533</p>
                            <p className={`${styles.digits} text text_type_digits-default`}>034532</p>
                            <p className={`${styles.digits} text text_type_digits-default`}>034530</p>
                            <p className={`${styles.digits} text text_type_digits-default`}>034527</p>
                            <p className={`${styles.digits} text text_type_digits-default`}>034525</p>
                        </div>
                        <div className={styles.type}>
                        <p className={`${styles.subtitle} text text_type_main-default`}>В работе:</p>
                            <p className={`${styles.digits} ${styles.digitsinactive} text text_type_digits-default`}>034533</p>
                            <p className={`${styles.digits} ${styles.digitsinactive} text text_type_digits-default`}>034532</p>
                            <p className={`${styles.digits} ${styles.digitsinactive} text text_type_digits-default`}>034530</p>
                        </div>
                    </div>
                    <div>
                        <p className={`${styles.subtitle} text text_type_main-default`}>Выполнено за все время:</p>
                        <p className={`${styles.digitslarge} text text_type_digits-large`}>28752</p>
                    </div>
                    <div>
                        <p className={`${styles.subtitle} text text_type_main-default`}>Выполнено за сегодня:</p>
                        <p className={`${styles.digitslarge} text text_type_digits-large`}>138</p>
                    </div>
                </div>
            </div>
        </>
    )
}

