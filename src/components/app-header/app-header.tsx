import React from 'react';
import styles from './app-header.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
const [current, setCurrent] = React.useState('one');
  return (
    <div style={{ display: 'flex' }} className={styles.header}>
      <ul className={styles.headernavigation}>
        <li className={styles.headernav}>
        <BurgerIcon type='primary' />
        <div style= {{ backgroundColor: '#1C1C21', fontFamily: 'JetBrains' }} className="p-2">Конструктор</div>
        </li>
        <li className={styles.headernav}>
        <ListIcon type='secondary' />
        <div style= {{ backgroundColor: '#1C1C21', fontFamily: 'JetBrains' }} className="p-2">Лента заказов</div>
        </li>
        <li className={styles.headernav + ' ' + styles.headerlogo}>
        <Logo />
        </li>
        <li className={styles.headernav}>
        <ProfileIcon type='secondary' />
        <div style= {{ backgroundColor: '#1C1C21', fontFamily: 'JetBrains' }} className="p-2">Личный кабинет</div>
        </li>
      </ul>
    </div>
  );
  }
  
  export default AppHeader;