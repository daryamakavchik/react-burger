import React, { useState, useCallback, FC } from "react";
import { useDispatch } from '../services/store';
import { useHistory, Link } from "react-router-dom";
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { registerUser } from "../services/actions/auth";
import styles from "./register.module.css";

export const RegisterPage:FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [emailValue, setEmailValue] = useState<string>("E-mail");
  const [passwordValue, setPasswordValue] = useState("password");
  const [nameValue, setNameValue] = useState("");

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const redirectOnSuccess = () => {
    history.replace({
      pathname: "/",
      state: { from: "/register" },
    });
  };

  const onRegisterClick = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
        dispatch(registerUser(nameValue, emailValue, passwordValue, redirectOnSuccess));
    },
    [emailValue, nameValue, passwordValue]
  );

  return (
    <div className={styles.container}>
      <p className={`${styles.title} text text_type_main-medium`}>
        Регистрация
      </p>
      <form className={styles.form} onSubmit={(e) => onRegisterClick(e)}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={onNameChange}
        value={nameValue}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
      />
      <div className={styles.email}>
        <EmailInput value={''} onChange={onEmailChange} name={"email"} />
      </div>
      <div className={styles.password}>
        <PasswordInput
          // className={styles.password}
          onChange={onPasswordChange}
          name={"password"}
          value={''}
        />
      </div>
      <div className={styles.button}>
        <Button type="primary" size="large">
          Зарегистрироваться
        </Button>
      </div>
      </form>
      <div className={styles.textcontainer}>
        <p
          className={`${styles.text} text text_type_main-default text_color_inactive`}
        >
          Уже зарегистрированы?
        </p>
        <Link
          to="/login"
          className={`${styles.activetext} text text_type_main-default`}
        >
          Войти
        </Link>
      </div>
    </div>
  );
}
