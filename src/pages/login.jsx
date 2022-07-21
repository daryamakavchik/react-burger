import React, {useState} from 'react';
import styles from './login.module.css';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { loginUser } from '../services/actions/auth';
import { useDispatch } from 'react-redux';

export function LoginPage() {
  const dispatch = useDispatch();
  const [emailValue, setEmailValue] = useState('E-mail');
  const [passwordValue, setPasswordValue] = useState('password');

  const onPasswordChange = e => {
    setPasswordValue(e.target.value)
  }
  const onEmailChange = e => {
    setEmailValue(e.target.value)
  }

  return (
   <div className={styles.container}>
      <p className="text text_type_main-medium">Вход</p>
      <div className={styles.email}>
      <EmailInput onChange={onEmailChange} name={'email'} />
      </div>
      <div className={styles.password}>
      <PasswordInput className={styles.password} onChange={onPasswordChange} name={'password'} />
      </div>
      <div className={styles.button}>
      <Button type="primary" size="large" onClick={() => dispatch(loginUser(emailValue, passwordValue))}>Войти</Button>
      </div>
      <div className={styles.textcontainer}>
      <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Вы - новый пользователь?</p>
      <Link to='/register' className={`${styles.activetext} text text_type_main-default`}>Зарегистрироваться</Link>
      </div>
      <div className={styles.textcontainer}>
        <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Забыли пароль?</p>
        <Link to='/forgot-password' className={`${styles.activetext} text text_type_main-default`}>Восстановить пароль</Link>
      </div>
   </div>
  );
}
