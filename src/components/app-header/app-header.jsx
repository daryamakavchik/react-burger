import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

function AppHeader() {
  const history = useHistory();

  const onProfileClick = useCallback(() => {
    history.replace({ pathname: "/profile" });
  }, [history]);

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
          <a className={styles.headernav} href="#top">
            <ListIcon type="secondary" />
            <div className={`${styles.icon} p-2`}>Лента заказов</div>
          </a>
        </li>
        <li onClick={onClick} className={styles.headernav + " " + styles.headerlogo}>
          <Logo />
        </li>
        <li className={styles.headernav}>
          <a className={styles.headernav} href="#top">
            <ProfileIcon type="secondary" />
            <div
              to="/profile"
              className={`${styles.icon} p-2`}
              onClick={onProfileClick}
            >
              Личный кабинет
            </div>
          </a>
        </li>
      </ul>
    </header>
  );
}

export default AppHeader;
