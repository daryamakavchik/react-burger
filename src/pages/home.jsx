import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./home.module.css";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import { getUserInfo } from "../services/actions/auth";

export function HomePage() {
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.data.isLoading);
  useEffect(() => dispatch(getUserInfo()), [dispatch]);
  
  return (
        <main className={styles.content}>
          {isLoading && (
            <p className="text text_type_main-large">Загрузка...</p>
          )}
          <>
            <BurgerIngredients />
            <BurgerConstructor />
          </>
        </main>
  );
}
