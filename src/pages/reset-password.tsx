import React, { useState, FC } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./resetpassword.module.css";
import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { savePassword } from "../services/actions/auth";
import { useDispatch } from "react-redux";

export const ResetPasswordPage:FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [passwordValue, setPasswordValue] = useState("");
  const [codeValue, setCodeValue] = useState("");

  const onPasswordChange = (e: React.ChangeEvent<any>) => {
    setPasswordValue(e.target.value);
  };

  const onCodeChange = (e: React.ChangeEvent<any>) => {
    setCodeValue(e.target.value);
  };

  const redirectOnSuccess = () => {
    history.replace({
      pathname: "/login",
      state: { from: "/reset-password" },
    });
  };

  const saveUserPassword = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    dispatch(savePassword(passwordValue, codeValue, redirectOnSuccess), [dispatch]);
    setPasswordValue("");
    setCodeValue("");
  };

  return (
    <div className={styles.container}>
      <p className={`${styles.title} text text_type_main-medium`}>
        Восстановление пароля
      </p>
      <form className={styles.form} onSubmit={(e) => saveUserPassword(e)}>
      <div className={styles.password}>
        <PasswordInput
          placeholder={"Введите новый пароль"}
          onChange={onPasswordChange}
          value={passwordValue}
          name={"password"}
        />
      </div>
      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        onChange={onCodeChange}
        value={codeValue}
        name={"code"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
      />
      <div className={styles.button}>
        <Button type="primary" size="large">
          Сохранить
        </Button>
      </div>
      </form>
      <div className={styles.textcontainer}>
        <p
          className={`${styles.text} text text_type_main-default text_color_inactive`}
        >
          Вспомнили пароль?
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
