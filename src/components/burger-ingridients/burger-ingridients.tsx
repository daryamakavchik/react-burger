import React from "react";
import styles from "./burger-ingridients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

interface BurgerIngridientsData {
  name: string;
  image: string;
}

interface BurgerIngridientsProps {
  data: BurgerIngridientsData[];
}

export default function BurgerIngridients({ data }: BurgerIngridientsProps) {
  const [current, setCurrent] = React.useState("one");
  return (
    <>
      <section className={styles.ingridients}>
        <div className={styles.maintitle}>Соберите бургер</div>
        <div className={styles.optionselection}>
          <Tab value="one" active={current === "one"} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="two" active={current === "two"} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="three" active={current === "three"} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
        <section className={styles.options}>
          <div className={styles.title}>Булки</div>
          <div className={styles.optionscards}>
            <div className={styles.optioncard}>
              <img src={data[14].image} />
              <p className={styles.optiontext}>{data[14].name}</p>
            </div>
            <div className={styles.optioncard}>
              <img src={data[0].image} />
              <p className={styles.optiontext}>{data[0].name}</p>
            </div>
          </div>
          <div className={styles.title}>Соусы</div>
          <div className={styles.optionscards}>
            <div className={styles.optioncard}>
              <img src={data[3].image} />
              <p className={styles.optiontext}>{data[3].name}</p>
            </div>
            <div className={styles.optioncard}>
              <img src={data[6].image} />
              <p className={styles.optiontext}>{data[6].name}</p>
            </div>
            <div className={styles.optioncard}>
              <img src={data[5].image} />
              <p className={styles.optiontext}>{data[5].name}</p>
            </div>
            <div className={styles.optioncard}>
              <img src={data[9].image} />
              <p className={styles.optiontext}>{data[9].name}</p>
            </div>
          </div>
          <div className={styles.title}>Начинки</div>
          <div className={styles.optionscards}>
            <div className={styles.optioncard}>
              <img src={data[1].image} />
              <p className={styles.optiontext}>{data[1].name}</p>
            </div>
            <div className={styles.optioncard}>
              <img src={data[2].image} />
              <p className={styles.optiontext}>{data[2].name}</p>
            </div>
            <div className={styles.optioncard}>
              <img src={data[4].image} />
              <p className={styles.optiontext}>{data[4].name}</p>
            </div>
            <div className={styles.optioncard}>
              <img src={data[7].image} />
              <p className={styles.optiontext}>{data[7].name}</p>
            </div>
            <div className={styles.optioncard}>
              <img src={data[8].image} />
              <p className={styles.optiontext}>{data[8].name}</p>
            </div>
            <div className={styles.optioncard}>
              <img src={data[10].image} />
              <p className={styles.optiontext}>{data[10].name}</p>
            </div>
            <div className={styles.optioncard}>
              <img src={data[11].image} />
              <p className={styles.optiontext}>{data[11].name}</p>
            </div>
            <div className={styles.optioncard}>
              <img src={data[12].image} />
              <p className={styles.optiontext}>{data[12].name}</p>
            </div>
            <div className={styles.optioncard}>
              <img src={data[13].image} />
              <p className={styles.optiontext}>{data[13].name}</p>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
