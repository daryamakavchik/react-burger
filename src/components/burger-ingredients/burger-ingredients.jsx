import React, { FC } from 'react';
import { useRef, useState } from "react";
import { useSelector } from 'react-redux';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientCategory } from "../ingredient-category/ingredient-category";
import styles from "./burger-ingredients.module.css";

export const BurgerIngredients:FC = () => {
  const [current, setCurrent] = useState("bun");
  const isLoading = useSelector(store => store.data.isLoading);

  const { data } = useSelector(store => store.data);
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

  const onTabClick = (tab, categoryRef) => () => {
    setCurrent(tab);
    scroll(categoryRef);
  };

  const handleScroll = () => {
		if (containerRef && bunsRef && sauceRef && mainRef && containerRef.current && bunsRef.current && sauceRef.current && mainRef.current) {
			const bunDistance = Math.abs(containerRef.current.getBoundingClientRect().top - bunsRef.current.getBoundingClientRect().top)
			const sauceDistance = Math.abs(containerRef.current.getBoundingClientRect().top - sauceRef.current.getBoundingClientRect().top)
			const mainDistance = Math.abs(containerRef.current.getBoundingClientRect().top - mainRef.current.getBoundingClientRect().top)
			const minDistance = Math.min(bunDistance, sauceDistance, mainDistance);
			const currentHeader = minDistance === bunDistance
				? 'bun' : minDistance === sauceDistance ? 'sauce' : 'main';
			setCurrent(prevState => (currentHeader === prevState ? prevState : currentHeader))
		}
	}

  return (
    !isLoading &&
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
        <section className={styles.options} ref={containerRef} onScroll={handleScroll}>
          <>
            <IngredientCategory
              id="bun"
              title="Булки"
              ingredients={bunsArr}
              ref={bunsRef}
              className={styles.smallsection}
            />
            <IngredientCategory
              id="sauce"
              title="Соусы"
              ingredients={sauceArr}
              ref={sauceRef}
              className={styles.smallsection}
            />
            <IngredientCategory
              id="main"
              title="Начинки"
              ingredients={mainArr}
              ref={mainRef}
              className={styles.smallsection}
            />
          </>
        </section>
      </section>
    </>
  );
}