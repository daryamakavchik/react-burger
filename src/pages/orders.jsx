import React from 'react';
import styles from './feed.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation } from 'react-router-dom';
import { wsConnectionClosedAction, wsConnectionStartAction } from '../services/actions/ws';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import OrderCard from '../components/ordercard/ordercard';

export default function Orders({orders}){
    const dispatch = useDispatch();
	const location = useLocation();

	useEffect(
		() => {
			dispatch(wsConnectionStartAction());
			return () => {
				dispatch(wsConnectionClosedAction())
				return;
			}
		},
		[dispatch]
	);

    return (
        <ul className={styles.orders}>
            { orders.map(el => (
        <OrderCard order={el} />
            ))}
    </ul>
    )
}