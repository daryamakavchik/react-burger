import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import styles from "./forgotpassword.module.css";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { resetPassword } from "../services/actions/auth";

export function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [emailValue, setEmailValue] = useState("");

  const isforgotPassword = useSelector((store) => store.user.isforgotPassword);
  const isUserAuthorized = useSelector((store) => store.user.isUserAuthorized);

  const onEmailChange = (e) => { setEmailValue(e.target.value) };

  const redirectOnSuccess = () => {
    history.replace({
      pathname: "/reset-password",
      state: { from: "/forgot-password" },
    });
  };

  const resetUserPassword = (e, emailValue) => {
    e.preventDefault();
    dispatch(resetPassword(emailValue, redirectOnSuccess), [dispatch]);
    setEmailValue("");
  };

  if (isUserAuthorized) {
    return (
      <Redirect to={{ pathname: "/" }}/>
    );
  }

  if (!isUserAuthorized && isforgotPassword) {
    return (
      <Redirect to={{ pathname: "/reset-password" }}/>
    );
  }

  return (
    <div className={styles.container}>
      <p className={`${styles.title} text text_type_main-medium`}>
        Восстановление пароля
      </p>
      <form className={styles.form} onSubmit={(e) => resetUserPassword(e)}>
        <div className={styles.email}>
          <EmailInput
            onChange={onEmailChange}
            value={emailValue}
            name={"email"}
          />
        </div>
        <div className={styles.button}>
          <Button type="primary" size="large">
            Восстановить
          </Button>
        </div>
      </form>
      <div className={styles.textcontainer}>
        <p className={`${styles.text} text text_type_main-default text_color_inactive`}>
          Вспомнили пароль?
        </p>
        <Link to="/login" className={`${styles.activetext} text text_type_main-default`}>
          Войти
        </Link>
      </div>
    </div>
  );
}
