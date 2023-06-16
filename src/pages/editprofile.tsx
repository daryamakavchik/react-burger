import React, { useState, useEffect, FC } from "react";
import { updateUser } from "../services/actions/auth";
import { useDispatch, useSelector } from '../services/store';
import {
  Input,
  EmailInput,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TProfileFormProps } from "../utils/types";
import styles from "./profile.module.css";

export const EditProfile: FC = () => {

  const [state, setState] = useState<TProfileFormProps>({ name: "", email: "", password: "", isValueChanged: false});
  const dispatch = useDispatch();

  const userName = useSelector((store) => store.user.user.name);
  const userLogin = useSelector((store) => store.user.user.email);
  const userPassword = useSelector((store) => store.user.user.password);

  useEffect(() => {
    setState((state) => {
      return {
        ...state,
        name: userName,
        email: userLogin,
        password: userPassword,
        isValueChanged: false,
      };
    });
  }, [userName, userLogin, userPassword]);

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setState({ ...state, name: e.target.value, isValueChanged: true });
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setState({ ...state, password: e.target.value, isValueChanged: true });
  };
  const onLoginChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setState({ ...state, email: e.target.value, isValueChanged: true });
  };
  const onSave = (e: React.FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    dispatch(updateUser(state.email, state.name));
  };

  const onCancel = () => {
    setState((state) => {
      return {
        ...state,
        name: userName,
        email: userLogin,
        password: userPassword,
        isValueChanged: false,
      };
    });
  };
  
  return (
    <form className={styles.form} onSubmit={(e) => onSave(e)}>
      <div className={styles.input}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={onNameChange}
        value={state.name || ""}
        name={"name"}
        icon={"EditIcon"}
      />
      </div>
      <div className={styles.emailinput}>
        <EmailInput
          onChange={onLoginChange}
          name={"login"}
          value={state.email || ""}
        />
      </div>
      <div className={styles.password}>
        <PasswordInput
          onChange={onPasswordChange}
          name={"password"}
          value={state.password || ""}
        />
      </div>
      <span className={state.isValueChanged ? styles.visible : styles.hidden}>
        <Button size="medium" htmlType="button" type="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button size="medium" htmlType="button" type="primary">
          Save
        </Button>
      </span>
    </form>
  );
}
