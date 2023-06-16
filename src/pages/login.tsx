import React, { useState, FC } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from '../services/store';
import {
  EmailInput,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { loginUser } from "../services/actions/auth";
import { TLocationState } from "../utils/types";
import styles from "./login.module.css";

export const LoginPage:FC = () => {
  const dispatch = useDispatch();
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const isUserAuthorized = useSelector((store) => store.user.isUserAuthorized);
  const { state } = useLocation<TLocationState>();

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const login = (e: React.FormEvent<HTMLFormElement>, emailValue:string, passwordValue:string) => {
    e.preventDefault();
    dispatch(loginUser(emailValue, passwordValue));
  };

  if (isUserAuthorized) {
    return <Redirect to={
      state?.from || 
      "/"} />;
  }

  return (
    <div className={styles.container}>
      <p className="text text_type_main-medium">Log in</p>
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
            placeholder="Password"
            onChange={onPasswordChange}
            name={"password"}
            value={passwordValue}
          />
        </div>
        <div className={styles.button}>
          <Button htmlType="submit" type="primary" size="large">
            Log in
          </Button>
        </div>
      </form>
      <div className={styles.textcontainer}>
        <p
          className={`${styles.text} text text_type_main-default text_color_inactive`}
        >
          A new user?
        </p>
        <Link
          to="/register"
          className={`${styles.activetext} text text_type_main-default`}
        >
          Sign up
        </Link>
      </div>
      <div className={styles.textcontainer}>
        <p
          className={`${styles.text} text text_type_main-default text_color_inactive`}
        >
          Forgot your password?
        </p>
        <Link
          to="/forgot-password"
          className={`${styles.activetext} text text_type_main-default`}
        >
          Recover your password
        </Link>
      </div>
    </div>
  );
}
