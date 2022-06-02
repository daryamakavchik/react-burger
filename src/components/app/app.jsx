import { useEffect, useState } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "./app.module.css";
import { fetchData } from "../../utils/api";

const apiUrl = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [state, setLoadedDataState] = useState({
    data: [],
    hasError: false,
    isLoading: true,
  });

  useEffect(() => {
    getIngredients();
  }, []);

  function getIngredients() {
    setLoadedDataState({ ...state, hasError: false, isLoading: true });
    fetchData()
      .then((obj) =>
        setLoadedDataState({ ...state, data: obj.data, isLoading: false })
      )
      .catch((e) => {
        setLoadedDataState({ ...state, hasError: true, isLoading: false });
      });
  }

  return (
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
  );
}

export default App;
