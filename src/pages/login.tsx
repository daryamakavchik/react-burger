import React, { useState, FC, SyntheticEvent } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from '../services/actions/auth';
import {
  EmailInput,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { loginUser } from "../services/actions/auth";
import styles from "./login.module.css";
import { RootState } from "../services/store";
import { TLocationState } from "../components/app/app";

// const { state } = useLocation<TLocationState>();

export const LoginPage:FC = () => {
  const dispatch = useDispatch();
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const isUserAuthorized = useSelector((store:RootState) => store.user.isUserAuthorized);

  const onPasswordChange = (e: React.ChangeEvent<any>) => {
    setPasswordValue(e.target.value);
  };
  const onEmailChange = (e: React.ChangeEvent<any>) => {
    setEmailValue(e.target.value);
  };

  const login = (e: React.ChangeEvent<any>, emailValue:string, passwordValue:string) => {
    e.preventDefault();
    loginUser(emailValue, passwordValue);
  };

  // if (isUserAuthorized) {
  //   return <Redirect to={state?.from || "/"} />;
  // }

  return (
    <div className={styles.container}>
      <p className="text text_type_main-medium">Вход</p>
      <form
        className={styles.form}
        onSubmit={(e) => login(e, emailValue, passwordValue)}
      >
        <div className={styles.email}>
          <EmailInput
            onChange={onEmailChange}
            name={"email"}
            value={emailValue}
          />
        </div>
        <div className={styles.password}>
          <PasswordInput
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
