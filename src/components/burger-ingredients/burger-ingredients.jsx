import { useRef } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { IngredientsCategory } from "../ingredients-category/ingredients-category";

export default function BurgerIngredients({ data }) {
  const bunsArr = data.filter((el) => el.type === "bun");
  const mainArr = data.filter((el) => el.type === "main");
  const sauceArr = data.filter((el) => el.type === "sauce");

  const containerRef = useRef(null);

  const bunsRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const scroll = (ref) => containerRef.current.scroll({
    behavior: 'smooth',
    top: ref.current.offsetTop - containerRef.current.offsetTop - 25
  });

  return (
    <>
      <section className={styles.ingridients}>
      <p className="text text_type_main-large">Соберите бургер</p>
        <div className={styles.optionselection}>
          <Tab
            value="bun"
            onClick={() => scroll(bunsRef)}
          >
            Булки
          </Tab>
          <Tab
            value="sauce"
            onClick={() => scroll(sauceRef)}
          >
            Соусы
          </Tab>
          <Tab
            value="main"
            onClick={() => scroll(mainRef)}
          >
            Начинки
          </Tab>
        </div>
        <section className={styles.options} ref={containerRef}>
            <>
            <IngredientsCategory title='Булки' ingredients={bunsArr} ref={bunsRef} />
            <IngredientsCategory title='Соусы' ingredients={sauceArr} ref={sauceRef} />
            <IngredientsCategory title='Начинки' ingredients={mainArr} ref={mainRef} />
            </>
        </section>
      </section>
    </>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.array,
};
