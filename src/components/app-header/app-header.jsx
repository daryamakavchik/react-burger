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

  const onClick = useCallback(() => {
    history.replace({ pathname: "/" });
  }, [history]);

  return (
    <header className={styles.header}>
      <ul className={styles.headernavigation}>
        <li className={styles.headernav}>
          <a className={styles.headernav} href="#top">
            <BurgerIcon type="secondary" />
            <div className={`${styles.icon} p-2`} onClick={onClick}>
              Конструктор
            </div>
          </a>
        </li>
        <li className={styles.headernav}>
          <Link className={styles.headernav} href="#top" to='/feed'>
            <ListIcon type="secondary" />
            <div className={`${styles.icon} p-2`}>Лента заказов</div>
          </Link>
        </li>
        <li onClick={onClick} className={styles.headernav + " " + styles.headerlogo}>
          <Logo />
        </li>
        <li className={styles.headernav}>
          <Link className={styles.headernav} href="#top" to='/profile'>
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
