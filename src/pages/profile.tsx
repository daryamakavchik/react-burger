import React, { FC } from "react";
import { useDispatch } from '../services/actions/auth';
import { NavLink, Switch, Route, useRouteMatch } from "react-router-dom";
import styles from "./profile.module.css";
import { Orders } from "./orders";
import { EditProfile } from "./editprofile";
import { logoutUser } from "../services/actions/auth";
import { useState } from "react";

export const ProfilePage:FC = () => {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const [isHistoryLinkActive, setHistoryLinkActive] = useState(false);
  const logout = () => {
    logoutUser();
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>

          <div className={styles.navblock}>
            <ul className={styles.navigation}>
              <li>
                <NavLink
                  exact
                  to="/profile"
                  className={`${styles.text} 
              'pt-4',
              'pb-4',
              'pr-5',
              'mr-2',
              'text text_type_main-medium text_color_inactive`}
                  onClick={() => setHistoryLinkActive(false)}
                  activeClassName={styles.textactive}
                >
                  <span>Профиль</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to="/profile/orders"
                  className={`${styles.text} 
              'pt-4',
              'pb-4',
              'pr-5',
              'mr-2',
              'text text_type_main-medium text_color_inactive`}
                  onClick={() => setHistoryLinkActive(true)}
                  activeClassName={styles.textactive}
                  id='orderhistory'
                >
                  <span>История заказов</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to="/login"
                  className={`${styles.text} 
              'pt-4',
              'pb-4',
              'pr-5',
              'mr-2',
              'text text_type_main-medium text_color_inactive`}
                  activeClassName={styles.textactive}
                  onClick={logout}
                >
                  <span>Выход</span>
                </NavLink>
              </li>
            </ul>
            <div className={styles.footer}>
              <p
                className={ !isHistoryLinkActive ? `${styles.subtext} text text_type_main-default text_color_inactive` : `${styles.disabledsubtext}`}
              >
                В этом разделе вы можете изменить свои персональные данные.
              </p>
            </div>
          </div>

          <Switch>
            <Route exact path={path} children={<EditProfile />} />
            <Route exact path={`${path}/orders`} children={<Orders />} />
          </Switch>
        </div>
      </div>
    </>
  );
}
