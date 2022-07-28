import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
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
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

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

  const login = () => {
    dispatch(loginUser(emailValue, passwordValue, redirectOnSuccess));
  };

  return (
    <div className={styles.container}>
      <p className="text text_type_main-medium">Вход</p>
      <form>
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
        <Button type="primary" size="large" onClick={login}>
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
