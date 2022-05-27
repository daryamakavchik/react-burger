import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngridients from "../burger-ingridients/burger-ingridients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "./app.module.css";
import { data } from "../../utils/data";

function App() {
  return (
    <div className={styles.page}>
      <section className={styles.App}>
        <AppHeader />
        <main className={styles.content}>
          <BurgerIngridients data={data} />
          <BurgerConstructor data={data} />
        </main>
      </section>
    </div>
  );
}

export default App;
