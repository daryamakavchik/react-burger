import React, {useState} from 'react';
import styles from './login.module.css';
import { EmailInput, Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

export function LoginPage() {
  const [emailValue, setEmailValue] = useState('E-mail')
  const [passwordValue, setPasswordValue] = useState('password')
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
      <Input style={{width: 480, color: '#8585AD'}}  onChange={onEmailChange} value={emailValue} name={'email'} />
      </div>
      <div className={styles.password}>
      <PasswordInput style={{width: 480}} className={styles.password} onChange={onPasswordChange} value={passwordValue} name={'password'} />
      </div>
      <div className={styles.button}>
      <Button className={styles.button} type="primary" size="large">Войти</Button>
      </div>
      <div className={styles.textcontainer}>
      <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Вы - новый пользователь?</p>
      <p className={`${styles.activetext} text text_type_main-default`}>Зарегистрироваться</p>
      </div>
      <div className={styles.textcontainer}>
        <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Забыли пароль?</p>
        <p className={`${styles.activetext} text text_type_main-default`}>Восстановить пароль</p>
      </div>
   </div>
  );
}
