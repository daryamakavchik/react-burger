import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngridients from '../burger-ingridients/burger-ingridients';
import BurgerComponents from '../burger-components/burger-components';
import styles from './app.module.css';
import { data } from '../../utils/data.js';

function App() {
  return (
    <section className={styles.App}>
      <AppHeader />
      <BurgerIngridients 
      namebun1={data[14].name} 
      namebun2={data[0].name} 
      namesauce1={data[3].name} 
      namesauce2={data[6].name}
      namesauce3={data[5].name}
      namesauce4={data[9].name}
      meat={data[4].name}
      fruit={data[7].name}
      rings={data[8].name}
      pricebun1={data[14].price}
      pricebun2={data[14].price}
      pricesauce1={data[3].price}
      pricesauce2={data[6].price}
      pricesauce3={data[5].price}
      pricemeat={data[4].price}
      pricefruit={data[7].price}
      pricerings={data[8].price}
      />
    </section>
  );
}

export default App;
