import React, { FC } from 'react';
import { useRef, useState, RefObject } from "react";
import { useSelector } from '../../services/actions/auth';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientCategory } from "../ingredient-category/ingredient-category";
import { RootState } from '../../services/store';
import { TIngredientData } from '../../utils/types';
import styles from "./burger-ingredients.module.css";

export const BurgerIngredients:FC = () => {
  const [current, setCurrent] = useState("bun");
  const isLoading = useSelector((store:RootState) => store.data.isLoading);

  const { data } = useSelector((store:RootState) => store.data);
  const bunsArr = data.filter((el:TIngredientData) => el.type === "bun");
  const mainArr = data.filter((el:TIngredientData) => el.type === "main");
  const sauceArr = data.filter((el:TIngredientData) => el.type === "sauce");

  const containerRef = useRef<HTMLDivElement>(null);
  const bunsRef = useRef<HTMLElement>(null);
  const sauceRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  const scroll = (ref:any) =>
    containerRef.current!.scroll({
      behavior: "smooth",
      top: ref.current.offsetTop - containerRef.current!.offsetTop - 40,
    });

  const onTabClick = (tab:string, categoryRef:RefObject<HTMLElement>) => () => {
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
    !isLoading ?
    <>
      <section className={styles.ingridients}>
        <p className="text text_type_main-large">Соберите бургер</p>
        <div className={styles.optionselection}>
          <Tab value='' active={current === "bun"} onClick={onTabClick("bun", bunsRef)}>
            Булки
          </Tab>
          <Tab value=''
            active={current === "sauce"}
            onClick={onTabClick("sauce", sauceRef)}
          >
            Соусы
          </Tab>
          <Tab value=''
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
    </> : null
  );
}