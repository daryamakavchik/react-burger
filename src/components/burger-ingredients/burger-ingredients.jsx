import React from 'react';
import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsCategory } from "../ingredients-category/ingredients-category";
import styles from "./burger-ingredients.module.css";
import { getData, setIngredientsData } from '../../services/actions/actions';

export default function BurgerIngredients() {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(setIngredientsData()) }, [dispatch]);   

  const data = useSelector(store => store.data.data);

  const [current, setCurrent] = useState("bun");

  const bunsArr = data.filter((el) => el.type === "bun");
  const mainArr = data.filter((el) => el.type === "main");
  const sauceArr = data.filter((el) => el.type === "sauce");

  const containerRef = useRef(null);

  const bunsRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const scroll = (ref) =>
    containerRef.current.scroll({
      behavior: "smooth",
      top: ref.current.offsetTop - containerRef.current.offsetTop - 40,
    });

  const onTabClick = (tab) => () => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className={styles.ingridients}>
        <p className="text text_type_main-large">Соберите бургер</p>
        <div className={styles.optionselection}>
          <Tab active={current === "bun"} onClick={onTabClick("bun", bunsRef)}>
            Булки
          </Tab>
          <Tab
            active={current === "sauce"}
            onClick={onTabClick("sauce", sauceRef)}
          >
            Соусы
          </Tab>
          <Tab
            active={current === "main"}
            onClick={onTabClick("main", mainRef)}
          >
            Начинки
          </Tab>
        </div>
        <section className={styles.options} ref={containerRef}>
          <>
            <IngredientsCategory
              id="bun"
              title="Булки"
              ingredients={bunsArr}
              ref={bunsRef}
            />
            <IngredientsCategory
              id="sauce"
              title="Соусы"
              ingredients={sauceArr}
              ref={sauceRef}
            />
            <IngredientsCategory
              id="main"
              title="Начинки"
              ingredients={mainArr}
              ref={mainRef}
            />
          </>
        </section>
      </section>
    </>
  );
}