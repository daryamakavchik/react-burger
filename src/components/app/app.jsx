import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "./app.module.css";
import { rootReducer } from "../../services/reducers";
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { useSelector } from "react-redux";

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
export const store = createStore(rootReducer, enhancer);

function App() {
  const isLoading = useSelector(store => store.data.isLoading);
  return (
    <div className={styles.page}>
      <section className={styles.App}>
        <AppHeader />
        <main className={styles.content}>
          {isLoading && <p className="text text_type_main-large">Загрузка...</p>}
          <>
            <BurgerIngredients />
            <BurgerConstructor />
          </>
        </main>
      </section>
    </div>
  );
}

export default App;
