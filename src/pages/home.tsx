import React, { useEffect, FC } from "react";
import { useDispatch, useSelector } from '../services/store';
import styles from "./home.module.css";
import { BurgerIngredients } from "../components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../components/burger-constructor/burger-constructor";
import { getUserInfo } from "../services/actions/auth";
import { wsConnectionStartAction, wsConnectionClosedAction} from "../services/actions/ws";

export const HomePage:FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.data.isLoading);
  
  useEffect(() => { dispatch(getUserInfo()); }, [dispatch]);
  useEffect(() => {
    dispatch(
      wsConnectionStartAction("wss://norma.nomoreparties.space/orders/all")
    );
    return () => {
      dispatch(wsConnectionClosedAction());
    };
  }, [dispatch]);
  
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
