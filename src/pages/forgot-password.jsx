import React, { useState } from "react";
import styles from "./forgotpassword.module.css";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { apiPasswordReset } from "../utils/api";

export function ForgotPasswordPage() {
  const [emailValue, setEmailValue] = useState("");
  const history = useHistory();

  const onEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const redirectOnSuccess = () => {
    history.replace({
      pathname: "/reset-password",
      state: { from: "/forgot-password" },
    });
  };

  const resetPassword = (e) => {
    e.preventDefault();
    apiPasswordReset(emailValue, redirectOnSuccess);
    setEmailValue("");
  };

  return (
    <div className={styles.container}>
      <p className={`${styles.title} text text_type_main-medium`}>
        Восстановление пароля
      </p>
      <form>
        <div className={styles.email}>
          <EmailInput
            onChange={onEmailChange}
            value={emailValue}
            name={"email"}
          />
        </div>
        <div className={styles.button}>
          <Button type="primary" size="large" onClick={resetPassword}>
            Восстановить
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
