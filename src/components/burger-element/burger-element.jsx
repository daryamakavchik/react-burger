import React, {useRef} from "react";
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../burger-constructor/burger-constructor.module.css";

export default function BurgerElement({ item, index, handleClose, moveItem }) {

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'item',
    hover(item, monitor) {

      if (!ref.current) { return }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) { return }

      const elementPos = ref.current.getBoundingClientRect();
      const elementMiddle = (elementPos.bottom - elementPos.top) / 2;
      const userCursorOffset = monitor.getClientOffset().y - elementPos.top;

      // if dragging down, continue only when hover is smaller than middle Y
      if (dragIndex < hoverIndex && userCursorOffset < elementMiddle) { return }
      // if dragging up, continue only when hover is bigger than middle Y
      if (dragIndex > hoverIndex && userCursorOffset > elementMiddle) { return }

      moveItem(dragIndex, hoverIndex);
      item = ({...item, index: hoverIndex});
    },
  });

  const [{ isDrag }, drag] = useDrag({
    type: 'item',
    item: { index },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const opacity = isDrag ? 0 : 1;

  drag(drop(ref));

  return (
    <li key={index} className={styles.component} draggable={true} ref={ref} style={{opacity}}>
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
