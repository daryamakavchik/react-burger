import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { Link } from "react-router-dom";

function AppHeader() {
  const history = useHistory();

  return (
    <header className={styles.header}>
      <ul className={styles.headernavigation}>
        <li className={styles.headernav}>
        <Link className={styles.headernav} to='/'>
            <BurgerIcon type="secondary" />
            <div className={`${styles.icon} p-2`}>
              Конструктор
            </div>
            </Link>
        </li>
        <li className={styles.headernav}>
          <Link className={styles.headernav} to='/feed'>
            <ListIcon type="secondary" />
            <div className={`${styles.icon} p-2`}>Лента заказов</div>
          </Link>
        </li>
        <Link className={styles.headernav} to='/'>
        <li className={styles.headernav + " " + styles.headerlogo}>
          <Logo />
        </li>
        </Link>
        <li className={styles.headernav}>
          <Link className={styles.headernav} to='/profile'>
            <ProfileIcon type="secondary" />
            <div 
              className={`${styles.icon} p-2`}
            >
              Личный кабинет
            </div>
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default AppHeader;
