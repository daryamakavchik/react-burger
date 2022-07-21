import React, { useState } from "react";
import styles from "./profile.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import AppHeader from "../components/app-header/app-header";
import { useSelector } from "react-redux";

export function ProfilePage() {
  const userName = useSelector(store => store.user.user.name);
  const userLogin = useSelector(store => store.user.user.email);
  const userPassword = useSelector(store => store.user.user.password);

  const [nameValue, setNameValue] = useState(userName);
  const [loginValue, setLoginValue] = useState(userLogin);
  const [passwordValue, setPasswordValue] = useState(userPassword);

  const onNameChange = (e) => {
    setNameValue(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };
  const onLoginChange = (e) => {
    setLoginValue(e.target.value);
  };

  return (
    <>
    <AppHeader />
    <div className={styles.container}>
      <div className={styles.content}>
      <div className={styles.navigation}>
        <p className={`${styles.text} text text_type_main-medium`}>Профиль</p>
        <p className={`${styles.text} text text_type_main-medium`}>История заказов</p>
        <p className={`${styles.text} text text_type_main-medium`}>Выход</p>
      </div>
      <div className={styles.inputs}>
        <Input
          type={"text"}
          // placeholder={"Имя"}
          onChange={onNameChange}
          value={nameValue}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <div className={styles.email}>
          <EmailInput
            onChange={onLoginChange}
            name={"login"}
            value={loginValue}
          />
        </div>
        <div className={styles.password}>
          <PasswordInput
            className={styles.password}
            onChange={onPasswordChange}
            name={"password"}
            value={passwordValue}
          />
        </div>
      </div>
      <p className={`${styles.subtext} text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные.</p>
      </div>
      </div>
    </>
  );
}
