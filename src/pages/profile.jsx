import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./profile.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../components/app-header/app-header";
import { logoutUser, updateUser } from "../services/actions/auth";
import { getCookie } from "../services/actions/auth";

export function ProfilePage() {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    isValueChanged: false
  });
  const dispatch = useDispatch();

  const userName = useSelector((store) => store.user.user.name);
  const userLogin = useSelector((store) => store.user.user.email);
  const userPassword = useSelector((store) => store.user.user.password);

  useEffect(() => {
    setState((state) => {
      return {
        ...state,
        name: userName,
        email: userLogin,
        password: userPassword,
        isValueChanged: false
      };
    });
  }, [userName, userLogin, userPassword]);

  const logout = () => dispatch(logoutUser());
  const token = localStorage.getItem("accessToken");

  const onNameChange = (e) => {
    setState({ ...state, name: e.target.value, isValueChanged: true });
  };

  const onPasswordChange = (e) => {
    setState({ ...state, password: e.target.value, isValueChanged: true });
  };
  const onLoginChange = (e) => {
    setState({ ...state, email: e.target.value, isValueChanged: true });
  };
  const onSave = () =>
    dispatch(updateUser(state.email, state.name, getCookie("token")));

  const onCancel = () => {
    setState((state) => {
      return {
        ...state,
        name: userName,
        email: userLogin,
        password: userPassword,
        isValueChanged: false
      };
    });
  };

  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <div className={styles.content}>
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
                <span className={"ml-2"}>Профиль</span>
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
                <span className={"ml-2"}>История заказов</span>
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
                <span className={"ml-2"}>Выход</span>
              </NavLink>
            </li>
          </ul>
          <div className={styles.inputs}>
            <Input
              style={{ color: "#8585AD" }}
              type={"text"}
              placeholder={"Имя"}
              onChange={onNameChange}
              value={state.name}
              name={"name"}
              icon={"EditIcon"}
            />
            <div className={styles.email}>
              <EmailInput
                onChange={onLoginChange}
                name={"login"}
                value={state.email}
                icon={"EditIcon"}
              />
            </div>
            <div className={styles.password}>
              <PasswordInput
                className={styles.password}
                onChange={onPasswordChange}
                name={"password"}
                value={userPassword}
              />
            </div>
          </div>
          <div className={styles.footer}>
            <p
              className={`${styles.subtext} text text_type_main-default text_color_inactive`}
            >
              В этом разделе вы можете изменить свои персональные данные.
            </p>
            <span className={state.isValueChanged ? styles.visible: styles.hidden}>
              <Button size="medium" type="secondary" onClick={onCancel}>
                Отмена
              </Button>
              <Button onClick={onSave}>Сохранить</Button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
