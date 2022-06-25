import React from 'react';
import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsCategory } from "../ingredients-category/ingredients-category";
import styles from "./burger-ingredients.module.css";
import { setIngredientsData } from '../../services/actions/actions';

export default function BurgerIngredients() {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(setIngredientsData()) }, [dispatch]);   

  const { data } = useSelector(store => store.data);

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
            <IngredientsCategory
              id="bun"
              title="Булки"
              ingredients={bunsArr}
              ref={bunsRef}
              className={styles.smallsection}
            />
            <IngredientsCategory
              id="sauce"
              title="Соусы"
              ingredients={sauceArr}
              ref={sauceRef}
              className={styles.smallsection}
            />
            <IngredientsCategory
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