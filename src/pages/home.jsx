import React from "react";
import AppHeader from "../components/app-header/app-header";
import styles from "./home.module.css";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import { useSelector } from "react-redux";

export function HomePage() {
  const isLoading = useSelector((store) => store.data.isLoading);
  return (
    <div className={styles.page}>
      <section className={styles.App}>
        <AppHeader />
        <main className={styles.content}>
          {isLoading && (
            <p className="text text_type_main-large">Загрузка...</p>
          )}
          <>
            <BurgerIngredients />
            <BurgerConstructor />
          </>
        </main>
      </section>
    </div>
  );
}
