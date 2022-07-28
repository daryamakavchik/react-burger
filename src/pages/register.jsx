import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import styles from "./register.module.css";
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { registerUser } from "../services/actions/auth";

export function RegisterPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [emailValue, setEmailValue] = useState("E-mail");
  const [passwordValue, setPasswordValue] = useState("password");
  const [nameValue, setNameValue] = useState("");

  const onNameChange = (e) => {
    setNameValue(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };
  const onEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const redirectOnSuccess = () => {
    history.replace({
      pathname: "/",
      state: { from: "/register" },
    });
  };

  const onRegisterClick = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        registerUser(nameValue, emailValue, passwordValue, redirectOnSuccess)
      );
    },
    [emailValue, nameValue, passwordValue]
  );

  return (
    <div className={styles.container}>
      <p className={`${styles.title} text text_type_main-medium`}>
        Регистрация
      </p>
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
        <EmailInput onChange={onEmailChange} name={"email"} />
      </div>
      <div className={styles.password}>
        <PasswordInput
          className={styles.password}
          onChange={onPasswordChange}
          name={"password"}
        />
      </div>
      <div className={styles.button}>
        <Button type="primary" size="large" onClick={onRegisterClick}>
          Зарегистрироваться
        </Button>
      </div>
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
