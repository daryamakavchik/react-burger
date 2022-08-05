import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, Switch, Route, useRouteMatch } from "react-router-dom";
import styles from "./profile.module.css";
import Orders from "./orders";
import EditProfile from "./editprofile";
import { wsConnectionStartAction, wsConnectionClosedAction } from "../services/actions/ws";
import { getCorrectOrders } from "../utils/api";
import { setCorrectOrdersAction } from "../services/actions/feed";
import { logoutUser } from "../services/actions/auth";
import { getCookie } from "../services/actions/auth";
import { useSelector } from "react-redux";

export function ProfilePage() {
  const dispatch = useDispatch();
  const logout = () => dispatch(logoutUser());
  const { path } = useRouteMatch();
  const token = getCookie('token');
  const wsUrl = `wss://norma.nomoreparties.space/orders` + `?token=${token}`;

  React.useEffect(() => { dispatch(wsConnectionStartAction(wsUrl)); return () => { dispatch(wsConnectionClosedAction()); }}, [dispatch]);

  const { orders } = useSelector((store) => store.ws);
  const ingredientsData = useSelector((store) => store.data.data);
  const correctOrders = orders && getCorrectOrders(orders, ingredientsData).reverse();

  React.useEffect(() => { if (correctOrders && correctOrders.length) { dispatch(setCorrectOrdersAction(correctOrders));}});

  if (!correctOrders) {
    return (<p className={`${styles.text} text text_type_main-large text_color_inactive`}>Список пуст</p>)
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
                  activeClassName={styles.textactive}
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
                className={`${styles.subtext} text text_type_main-default text_color_inactive`}
              >
                В этом разделе вы можете изменить свои персональные данные.
              </p>
            </div>
          </div>

          <Switch>
            <Route exact path={path} children={<EditProfile />} />
            <Route exact path={`${path}/orders`} children={<Orders orders={correctOrders} />} />
          </Switch>
        </div>
      </div>
    </>
  );
}
