import React, { useState, useEffect } from "react";
import { updateUser } from "../services/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import styles from './profile.module.css';
import {
    Input,
    EmailInput,
    PasswordInput,
    Button,
  } from "@ya.praktikum/react-developer-burger-ui-components";

export default function EditProfile(){
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        isValueChanged: false
      });
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
            isValueChanged: false
          };
        });
      }, [userName, userLogin, userPassword]);
    

    const onNameChange = (e) => {
        setState({ ...state, name: e.target.value, isValueChanged: true });
      };
    
      const onPasswordChange = (e) => {
        setState({ ...state, password: e.target.value, isValueChanged: true });
      };
      const onLoginChange = (e) => {
        setState({ ...state, email: e.target.value, isValueChanged: true });
      };
      const onSave = (e) => {
        e.preventDefault();
        dispatch(updateUser(state.email, state.name));
      }
    
      const onCancel = () => {
        setState((state) => {
          return {
            ...state,
            name: userName,
            email: userLogin,
            password: userPassword,
            isValueChanged: false
          };
        });
      };
    return (
    <form className={styles.form} onSubmit={(e) => onSave(e)}>
            <Input
              style={{ color: "#8585AD" }}
              type={"text"}
              placeholder={"Имя"}
              onChange={onNameChange}
              value={state.name || ''}
              name={"name"}
              icon={"EditIcon"}
            />
            <div className={styles.email}>
              <EmailInput
                onChange={onLoginChange}
                style={{ marginTop: '24px', marginBottom: '24px' }}
                name={"login"}
                value={state.email || ''}
                icon={"EditIcon"}
              />
            </div>
            <div className={styles.password}>
              <PasswordInput
                className={styles.password}
                onChange={onPasswordChange}
                name={"password"}
                value={state.password || ''}
              />
            </div>
            <span className={state.isValueChanged ? styles.visible: styles.hidden}>
              <Button size="medium" type="secondary" onClick={onCancel}>
                Отмена
              </Button>
              <Button size="medium" type="primary">Сохранить</Button>
            </span>
            </form>
    )
}