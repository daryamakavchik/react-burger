import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingridients.module.css';
import bunone from '../../images/bun-01.svg';
import buntwo from '../../images/bun-02.svg';
import sauceone from '../../images/sauce-01.svg';
import saucetwo from '../../images/sauce-02.svg';
import saucethree from '../../images/sauce-03.svg';
import saucefour from '../../images/sauce-04.svg';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerComponents from '../burger-components/burger-components';

interface BurgerIngridientsProps{
  namebun1: string,
  namebun2: string,
  namesauce1: string,
  namesauce2: string,
  namesauce3: string, 
  namesauce4: string,
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


export default function BurgerIngridients(props: BurgerIngridientsProps) {
    const [current, setCurrent] = React.useState('one');
  return ( 
      <>
      <section className={styles.ingridients}>
  <div style={{ backgroundColor: '#131316' }} className={styles.maintitle}>
        Соберите бургер
    </div>
    <div style={{ display: 'flex' }} className={styles.optionselection} >
      <Tab value="one" active={current === 'one'} onClick={setCurrent}>Булки</Tab>
      <Tab value="two" active={current === 'two'} onClick={setCurrent}>Соусы</Tab>
      <Tab value="three" active={current === 'three'} onClick={setCurrent}>Начинки</Tab>
    </div>
    <section className={styles.optionssection}>
    <div className={styles.options}>
    <div style={{ backgroundColor: '#131316' }} className={styles.title}>
       Булки
    </div>
  <div className={styles.optionscards}>
    <div className={styles.optioncard}>
        <img src={bunone}/>
        <p className={styles.optiontext}>{props.namebun1}</p>
    </div>
    <div className={styles.optioncard}>
        <img src={buntwo}/>
        <p className={styles.optiontext}>{props.namebun2}</p>
    </div>
  </div>
  <div style={{ backgroundColor: '#131316' }} className={styles.title}>
       Соусы
    </div>
  <div className={styles.optionscards}>
    <div className={styles.optioncard}>
        <img src={sauceone}/>
        <p className={styles.optiontext}>{props.namesauce1}</p>
    </div>
    <div className={styles.optioncard}>
        <img src={saucetwo}/>
        <p className={styles.optiontext}>{props.namesauce2}</p>
    </div>
    <div className={styles.optioncard}>
        <img src={saucethree}/>
        <p className={styles.optiontext}>{props.namesauce3}</p>
    </div>
    <div className={styles.optioncard}>
        <img src={saucefour}/>
        <p className={styles.optiontext}>{props.namesauce4}</p>
    </div>
  </div>
  </div>
  <BurgerComponents 
    namebun1={props.namebun2} 
    namesauce1={props.namesauce3} 
    meat={props.meat} 
    fruit={props.fruit} 
    rings={props.rings}
    pricebun1={props.pricebun1}
    pricebun2={props.pricebun1}
    pricesauce1={props.pricesauce1}
    pricesauce2={props.pricesauce2}
    pricesauce3={props.pricesauce3}
    pricemeat={props.pricemeat}
    pricefruit={props.pricefruit}
    pricerings={props.pricerings}
    />
  </section>
  </section>
  </>
);
}
