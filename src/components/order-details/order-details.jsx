import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '/.order-details.module.css';

export default function OrderDetails({ props }){
    return(
        <>
            <p className="text text_type_digits-large">{props._id}</p>
            <p className="text text_type_main-medium">идентификатор заказа</p>
            <div className={styles.check}><CheckMarkIcon/></div>
            <p className="text text_type_main-default">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </>
    )
}