import React, { useState } from "react";
import { Link, useHistory, Redirect, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { loginUser } from "../services/actions/auth";
import styles from "./login.module.css";

export function LoginPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const isUserAuthorized = useSelector(store => store.user.isUserAuthorized);

  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };
  const onEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const redirectOnSuccess = () => {
    history.replace({
      pathname: "/",
      state: { from: "/login" },
    });
  };

  const login = (e, emailValue, passwordValue) => {
    e.preventDefault();
    dispatch(loginUser(emailValue, passwordValue, redirectOnSuccess))
  };

  if (isUserAuthorized) {
    return (
      <Redirect
        to={ location.from || '/'}
      />
    )
  }

  return (
    <div className={styles.container}>
      <p className="text text_type_main-medium">Вход</p>
      <form className={styles.form} onSubmit={(e) => login(e, emailValue, passwordValue)}>
      <div className={styles.email}>
        <EmailInput
          onChange={onEmailChange}
          name={"email"}
          value={emailValue}
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
      <div className={styles.button}>
        <Button type="primary" size="large">
          Войти
        </Button>
      </div>
      </form>
      <div className={styles.textcontainer}>
        <p
          className={`${styles.text} text text_type_main-default text_color_inactive`}
        >
          Вы - новый пользователь?
        </p>
        <Link
          to="/register"
          className={`${styles.activetext} text text_type_main-default`}
        >
          Зарегистрироваться
        </Link>
      </div>
      <div className={styles.textcontainer}>
        <p
          className={`${styles.text} text text_type_main-default text_color_inactive`}
        >
          Забыли пароль?
        </p>
        <Link
          to="/forgot-password"
          className={`${styles.activetext} text text_type_main-default`}
        >
          Восстановить пароль
        </Link>
      </div>
    </div>
  );
}
