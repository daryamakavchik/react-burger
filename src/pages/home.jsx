import React from 'react';
import styles from './home.module.css';
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import { useSelector } from 'react-redux';

export function HomePage() {
  const isLoading = useSelector((store) => store.data.isLoading);
  return (
    <main className={styles.content}>
      {isLoading && <p className="text text_type_main-large">Загрузка...</p>}
      <>
        <BurgerIngredients />
        <BurgerConstructor />
      </>
    </main>
  );
}
