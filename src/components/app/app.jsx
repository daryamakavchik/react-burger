import { useEffect, useState, useReducer } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "./app.module.css";
import { fetchData } from "../../utils/api";
import {
  BurgerConstructorContext,
  TotalPriceContext,
} from "../../services/BurgerConstructorContext";

const apiUrl = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [state, setLoadedDataState] = useState({
    data: [],
    hasError: false,
    isLoading: true,
  });
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setLoadedDataState({ ...state, hasError: false, isLoading: true });
    fetchData()
      .then((obj) => {
        setLoadedDataState({ ...state, data: obj.data, isLoading: false });
      })
      .catch((e) => {
        setLoadedDataState({ ...state, hasError: true, isLoading: false });
      });
  }, []);

  return (
    <BurgerConstructorContext.Provider value={state}>
      <TotalPriceContext.Provider value={{ totalPrice, setTotalPrice }}>
        <div className={styles.page}>
          <section className={styles.App}>
            <AppHeader />
            <main className={styles.content}>
              {state.isLoading && "Загрузка..."}
              {state.hasError && "Произошла ошибка"}
              {!state.isLoading && !state.hasError && (
                <>
                  <BurgerIngredients data={state.data} />
                  <BurgerConstructor data={state.data} />
                </>
              )}
            </main>
          </section>
        </div>
      </TotalPriceContext.Provider>
    </BurgerConstructorContext.Provider>
  );
}

export default App;
