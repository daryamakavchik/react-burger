import React, { useState, useEffect, FC, SyntheticEvent } from "react";
import { updateUser } from "../services/actions/auth";
import { useDispatch, useSelector } from '../services/actions/auth';
import styles from "./profile.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { RootState } from "../services/store";

export const EditProfile: FC = () => {

  type TProfileForm = {
    name: string;
    email: string;
    password: string;
    isValueChanged: boolean
  }

  const [state, setState] = useState<TProfileForm>({ name: "", email: "", password: "", isValueChanged: false});
  const dispatch = useDispatch();

  const userName = useSelector((store:RootState) => store.user.user.name);
  const userLogin = useSelector((store:RootState) => store.user.user.email);
  const userPassword = useSelector((store:RootState) => store.user.user.password);

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

  const onNameChange = (e: React.ChangeEvent<any>):void => {
    setState({ ...state, name: e.target.value, isValueChanged: true });
  };

  const onPasswordChange = (e: React.ChangeEvent<any>):void => {
    setState({ ...state, password: e.target.value, isValueChanged: true });
  };
  const onLoginChange = (e: React.ChangeEvent<any>):void => {
    setState({ ...state, email: e.target.value, isValueChanged: true });
  };
  const onSave = (e: React.ChangeEvent<any>):void => {
    e.preventDefault();
    updateUser(state.email, state.name);
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
        <Button size="medium" type="secondary" onClick={onCancel}>
          Отмена
        </Button>
        <Button size="medium" type="primary">
          Сохранить
        </Button>
      </span>
    </form>
  );
}
