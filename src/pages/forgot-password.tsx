import React, { useState, FC, SyntheticEvent } from "react";
import { useDispatch, useSelector } from '../services/actions/auth';
import { Redirect } from "react-router-dom";
import styles from "./forgotpassword.module.css";
import {
  EmailInput, Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { resetPassword } from "../services/actions/auth";
import { RootState } from "../services/store";

// type Props = {
//   children?: React.ReactNode
//   type?: "secondary" | "primary" | undefined;
//     size?: "small" | "medium" | "large" | undefined;
//     onClick?: (() => void) | ((e: SyntheticEvent) => void) | undefined;
//     disabled?: boolean | undefined;
//     name?: string | undefined;
//     htmlType?: "button" | undefined;
// };

// export function Button({children}: Props) {
//   return (
//     <>{children}</>
//   )
// }

export const ForgotPasswordPage:FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [emailValue, setEmailValue] = useState("");

  const isforgotPassword = useSelector((store:RootState) => store.user.isForgotPassword);
  const isUserAuthorized = useSelector((store:RootState) => store.user.isUserAuthorized);

  const onEmailChange = (e: React.ChangeEvent<any>) => { setEmailValue(e.target.value) };

  const redirectOnSuccess = () => {
    history.replace({
      pathname: "/reset-password",
      state: { from: "/forgot-password" },
    });
  };

  const resetUserPassword = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    resetPassword(emailValue, redirectOnSuccess);
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
