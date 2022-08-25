import React, { useRef, FC } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { UPDATE_ITEMS } from "../../services/actions";
import PropTypes from "prop-types";
import styles from "../burger-constructor/burger-constructor.module.css";

export const BurgerElement:FC = ({ item, index, handleClose }) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const [{ isDrag }, drag] = useDrag({
    type: "item",
    item: { index },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "item",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const elementPos = ref.current.getBoundingClientRect();
      const elementMiddle = (elementPos.bottom - elementPos.top) / 2;
      const userCursorOffset = monitor.getClientOffset().y - elementPos.top;

      if (dragIndex < hoverIndex && userCursorOffset < elementMiddle) {
        return;
      }
      if (dragIndex > hoverIndex && userCursorOffset > elementMiddle) {
        return;
      }

      dispatch({
        type: UPDATE_ITEMS,
        fromIndex: dragIndex,
        toIndex: hoverIndex,
      });
      item.index = hoverIndex;
    },
  });

  const opacity = isDrag ? 0.5 : 1;
  drag(drop(ref));

  return (
    <li className={styles.component} ref={ref} style={{ opacity }}>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => handleClose(item)}
        index={index}
      />
    </li>
  );
}

BurgerElement.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  handleClose: PropTypes.func,
  moveItem: PropTypes.func,
};
