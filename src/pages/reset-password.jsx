import React, {useState} from 'react';
import styles from './resetpassword.module.css';
import {Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { apiPasswordSave } from '../utils/api';

export function ResetPasswordPage() {
  const [passwordValue, setPasswordValue] = useState('');
  const [codeValue, setCodeValue] = useState('');

  const onPasswordChange = e => {
    setPasswordValue(e.target.value)
  }
  
  const onCodeChange = e => {
    setCodeValue(e.target.value)
  }

  const savePassword = (e) => {
    e.preventDefault();
    apiPasswordSave(passwordValue, codeValue);
    setPasswordValue('');
    setCodeValue('');
  }

  return (
   <div className={styles.container}>
      <p className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</p>
      <div className={styles.password}>
      < PasswordInput placeholder={'Введите новый пароль'} onChange={onPasswordChange} value={passwordValue} name={'password'} />
      </div>
      <Input type={'text'} placeholder={'Введите код из письма'}
      onChange={onCodeChange}
      value={codeValue}
      name={'code'}
      error={false}
      errorText={'Ошибка'}
      size={'default'} />
      <div className={styles.button}>
      <Button type="primary" size="large" onClick={savePassword}>Сохранить</Button>
      </div>
      <div className={styles.textcontainer}>
      <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Вспомнили пароль?</p>
      <Link to='/login' className={`${styles.activetext} text text_type_main-default`}>Войти</Link>
      </div>
   </div>
  );
}