import React, { useEffect, FC } from "react";
import { useDispatch, useSelector } from '../services/actions/auth';
import styles from "./home.module.css";
import { BurgerIngredients } from "../components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../components/burger-constructor/burger-constructor";
import { getUserInfo } from "../services/actions/auth";
import { RootState } from "../services/store";

export const HomePage:FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((store:RootState) => store.data.isLoading);
  
  useEffect(() => { getUserInfo(); }, []);
  
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
