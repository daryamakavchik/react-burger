import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-components.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import buntwo from '../../images/bun-02 2.svg';
import sauceone from '../../images/sauce-03 2.svg';
import meat from '../../images/meat-02.svg';
import fruit from '../../images/sp 1.svg';
import rings from '../../images/mineral rings.svg';


interface BurgerComponentsProps{
    namebun1: string,
    namesauce1: string,
    meat: string, 
    fruit: string,
    rings: string,
    pricebun1: number, 
    pricebun2: number,
    pricesauce1: number,
    pricesauce2: number,
    pricesauce3: number,
    pricemeat: number,
    pricefruit: number,
    pricerings: number
  }

export default function BurgerComponents(props: BurgerComponentsProps){
    return <div className={styles.components}>
            <div className={styles.component}>
                <img className={styles.componentimg} src={buntwo}/>
                <p className={styles.componentname}>{props.namebun1} (верх)</p>
                <p className={styles.componentcount}>{props.pricebun1}</p>
                <div className={styles.componenticon}>
                <CurrencyIcon type='primary' />
                </div>
                <div className={styles.componentdelete}>
                <DeleteIcon type="primary" />
                </div>
                </div>
                <ul className={styles.componentlist}>
            <li className={styles.componentlistitem}>
                <DragIcon type='primary' />
                <div className={styles.component}>
                <img className={styles.componentimg} src={sauceone}/>
                <p className={styles.componentname}>{props.namesauce1}</p>
                <p className={styles.componentcount}>{props.pricesauce1}</p>
                <div className={styles.componenticon}>
                <CurrencyIcon type='primary' />
                </div>
                <div className={styles.componentdelete}>
                <DeleteIcon type="primary" />
                </div>
                </div>
            </li>
            <li className={styles.componentlistitem}>
                <DragIcon type='primary' />
                <div className={styles.component}>
                <img className={styles.componentimg} src={meat}/>
                <p className={styles.componentname}>{props.meat}</p>
                <p className={styles.componentcount}>{props.pricemeat}</p>
                <div className={styles.componenticon}>
                <CurrencyIcon type='primary' />
                </div>
                <div className={styles.componentdelete}>
                <DeleteIcon type="primary" />
                </div>
                </div>
            </li>
            <li className={styles.componentlistitem}>
                <DragIcon type='primary' />
                <div className={styles.component}>
                <img className={styles.componentimg} src={fruit}/>
                <p className={styles.componentname}>{props.fruit}</p>
                <p className={styles.componentcount}>{props.pricefruit}</p>
                <div className={styles.componenticon}>
                <CurrencyIcon type='primary' />
                </div>
                <div className={styles.componentdelete}>
                <DeleteIcon type="primary" />
                </div>
                </div>
            </li>
            <li className={styles.componentlistitem}>
                <DragIcon type='primary' />
                <div className={styles.component}>
                <img className={styles.componentimg} src={rings}/>
                <p className={styles.componentname}>{props.rings}</p>
                <p className={styles.componentcount}>{props.pricerings}</p>
                <div className={styles.componenticon}>
                <CurrencyIcon type='primary' />
                </div>
                <div className={styles.componentdelete}>
                <DeleteIcon type="primary" />
                </div>
                </div>
            </li>
            <li className={styles.componentlistitem}>
                <DragIcon type='primary' />
                <div className={styles.component}>
                <img className={styles.componentimg} src={rings}/>
                <p className={styles.componentname}>{props.rings}</p>
                <p className={styles.componentcount}>{props.pricerings}</p>
                <div className={styles.componenticon}>
                <CurrencyIcon type='primary' />
                </div>
                <div className={styles.componentdelete}>
                <DeleteIcon type="primary" />
                </div>
                </div>
            </li>
            <li className={styles.componentlistitem}>
                <DragIcon type='primary' />
                <div className={styles.component}>
                <img className={styles.componentimg} src={rings}/>
                <p className={styles.componentname}>{props.rings}</p>
                <p className={styles.componentcount}>{props.pricerings}</p>
                <div className={styles.componenticon}>
                <CurrencyIcon type='primary' />
                </div>
                <div className={styles.componentdelete}>
                <DeleteIcon type="primary" />
                </div>
                </div>
            </li>
            <li className={styles.componentlistitem}>
                <DragIcon type='primary' />
                <div className={styles.component}>
                <img className={styles.componentimg} src={rings}/>
                <p className={styles.componentname}>{props.rings}</p>
                <p className={styles.componentcount}>{props.pricerings}</p>
                <div className={styles.componenticon}>
                <CurrencyIcon type='primary' />
                </div>
                <div className={styles.componentdelete}>
                <DeleteIcon type="primary" />
                </div>
                </div>
            </li>
            </ul>
            <div className={styles.component}>
                <img className={styles.componentimg} src={buntwo}/>
                <p className={styles.componentname}>{props.namebun1} (низ)</p>
                <p className={styles.componentcount}>{props.pricebun2}</p>
                <div className={styles.componenticon}>
                <CurrencyIcon type='primary' />
                </div>
                <div className={styles.componentdelete}>
                <DeleteIcon type="primary" />
                </div>
                </div>
            <div className={styles.total}>
                <div className={styles.text}>
            <p className="text text_type_digits-medium">{props.pricebun1 + props.pricebun2 + props.pricefruit + props.pricemeat + props.pricerings * 4 + props.pricesauce1 + props.pricesauce2 + props.pricesauce3}</p>
            </div>
            <CurrencyIcon type='primary'/>
            <div className={styles.button}>
            <Button type="primary" size="medium">Оформить заказ</Button>
            </div>
            </div>    
    </div>
}