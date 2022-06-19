import { useEffect, useState, useReducer } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "./app.module.css";
import { fetchData } from "../../utils/api";
import { BurgerConstructorContext } from "../../services/BurgerConstructorContext";
import { compose, configureStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from "../../services/reducers/rootReducer";

const initialState = {
  data: [],
  currentConstructorData: [],
  currentIngredientData: [],
  currentOrderData: [],
  hasError: false,
  isLoading: true,
}

const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = configureStore(rootReducer, initialState, enhancer); 
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 

const apiUrl = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  // const [state, setLoadedDataState] = useState({
  //   data: [],
  //   hasError: false,
  //   isLoading: true,
  // });

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
        <div className={styles.page}>
          <section className={styles.App}>
            <AppHeader />
            <BurgerConstructorContext.Provider value={state}>
            <main className={styles.content}>
              {state.isLoading && "Загрузка..."}
              {state.hasError && "Произошла ошибка"}
              {!state.isLoading && !state.hasError && (
                <>
                  <BurgerIngredients />
                  <BurgerConstructor />
                </>
              )}
            </main>
            </BurgerConstructorContext.Provider>
          </section>
        </div>
  );
}

export default App;
