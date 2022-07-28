import React from "react";
import AppHeader from "../components/app-header/app-header";
import styles from "./home.module.css";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserInfo } from "../services/actions/auth";

export function HomePage() {
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.data.isLoading);
  const accessToken = useSelector(store => store.user.user.accessToken);
  const isUserAuthorized = useSelector((store) => store.user.isUserAuthorized);
  // console.log(accessToken);

  isUserAuthorized && useEffect(() => dispatch(getUserInfo(accessToken)), [dispatch]);

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
