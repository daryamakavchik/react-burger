import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

function AppHeader() {

  return (
    <div style={{ display: "flex" }} className={styles.header}>
      <ul className={styles.headernavigation}>
        <li className={styles.headernav}>
          <a className={styles.headernav} href='#'>
          <BurgerIcon type="secondary" />
          <div
            style={{ backgroundColor: "#1C1C21", fontFamily: "JetBrains" }}
            className="p-2"
          >
            Конструктор
          </div>
          </a>
        </li>
        <li className={styles.headernav}>
        <a className={styles.headernav} href='#'>
          <ListIcon type="secondary" />
          <div
            style={{ backgroundColor: "#1C1C21", fontFamily: "JetBrains" }}
            className="p-2"
          >
            Лента заказов
          </div>
          </a>
        </li>
        <li className={styles.headernav + " " + styles.headerlogo}>
          <Logo />
        </li>
        <li className={styles.headernav}>
          <a className={styles.headernav} href='#'>
          <ProfileIcon type="secondary" />
          <div
            style={{ backgroundColor: "#1C1C21", fontFamily: "JetBrains" }}
            className="p-2"
          >
            Личный кабинет
          </div>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default AppHeader;
