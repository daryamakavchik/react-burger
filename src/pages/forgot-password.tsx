import React, { useState, FC } from "react";
import { useDispatch, useSelector } from '../services/store';
import { Redirect, Link, useHistory } from "react-router-dom";
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPassword } from "../services/actions/auth";
import styles from "./forgotpassword.module.css";

export const ForgotPasswordPage:FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [emailValue, setEmailValue] = useState("");

  const isforgotPassword = useSelector((store) => store.user.isForgotPassword);
  const isUserAuthorized = useSelector((store) => store.user.isUserAuthorized);

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => { setEmailValue(e.target.value) };

  const redirectOnSuccess = () => {
    history.replace({
      pathname: "/reset-password",
      state: { from: "/forgot-password" },
    });
  };

  const resetUserPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetPassword(emailValue, redirectOnSuccess));
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
        Password recovery
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
          <Button htmlType="button" type="primary" size="large">
            Recover
          </Button>
        </div>
      </form>
      <div className={styles.textcontainer}>
        <p className={`${styles.text} text text_type_main-default text_color_inactive`}>
          Remembered your password?
        </p>
        <Link to="/login" className={`${styles.activetext} text text_type_main-default`}>
          Log in
        </Link>
      </div>
    </div>
  );
}
