import React, { FC } from "react";
import { Link } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

export const AppHeader:FC = () => {

  return (
    <header className={styles.header}>
      <ul className={styles.headernavigation}>
        <li className={styles.headernav}>
        <Link className={styles.headernav} to='/'>
            <BurgerIcon type="secondary" />
            <div className={`${styles.icon} p-2`}>
              Constructor
            </div>
            </Link>
        </li>
        <li className={styles.headernav}>
          <Link className={styles.headernav} to='/feed'>
            <ListIcon type="secondary" />
            <div className={`${styles.icon} p-2`}>Order feed</div>
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
              My account
            </div>
          </Link>
        </li>
      </ul>
    </header>
  );
}
