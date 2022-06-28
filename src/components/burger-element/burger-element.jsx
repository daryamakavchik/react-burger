import React from "react";
import { useDrag } from "react-dnd";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../burger-constructor/burger-constructor.module.css";

export default function BurgerElement({ item, index, handleClose, onDragStartHandler, onDragEndHandler}) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
      type: "ingredient",
      item: item,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [item]
  );
  return (
    <li key={index} className={styles.component} draggable={true} ref={dragRef} onDragStart={onDragStartHandler} onDragEnd={onDragEndHandler}>
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
