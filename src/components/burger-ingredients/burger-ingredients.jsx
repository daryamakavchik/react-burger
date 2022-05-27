import React from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import IngredientsCategory from "../ingredients-category/ingredients-category";

export default function BurgerIngredients({ data }) {
  const [current, setCurrent] = React.useState("bun");
  const bunsArr = data.filter((el) => el.type === "bun");
  const mainArr = data.filter((el) => el.type === "main");
  const sauceArr = data.filter((el) => el.type === "sauce");

  return (
    <>
      <section className={styles.ingridients}>
        <div className={styles.maintitle}>Соберите бургер</div>
        <div className={styles.optionselection}>
          <Tab
            value="bun"
            active={current === "bun"}
            onClick={() => setCurrent("bun")}
          >
            Булки
          </Tab>
          <Tab
            value="sauce"
            active={current === "sauce"}
            onClick={() => setCurrent("sauce")}
          >
            Соусы
          </Tab>
          <Tab
            value="main"
            active={current === "main"}
            onClick={() => setCurrent("main")}
          >
            Начинки
          </Tab>
        </div>
        <section className={styles.options}>
          { current === "bun" ? (
            <>
              <div className={styles.title}>Булки</div>
              <div className={styles.optionscards}>
                <IngredientsCategory props={bunsArr} />
              </div>
            </>
          ) : current === "sauce" ? (
            <>
              <div className={styles.title}>Соусы</div>
              <div className={styles.optionscards}>
                <IngredientsCategory props={sauceArr} />
              </div>
            </>
          ) : current === "main" ? (
            <>
              <div className={styles.title}>Начинки</div>
              <div className={styles.optionscards}>
                <IngredientsCategory props={mainArr} />
              </div>
            </>
          ) : ( current === "bun" )
        }
        </section>
      </section>
    </>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.array,
};
