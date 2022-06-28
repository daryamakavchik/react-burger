import React, {useState} from "react";
import { useDrop, useDrag } from "react-dnd";
import { useRef } from "react";
import { DragSource, DropTarget } from "react-dnd";
import { findDOMNode } from 'react-dom';
import { useDispatch } from "react-redux";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../burger-constructor/burger-constructor.module.css";
import { onDropHandler } from "../../services/actions/actions";
import { setCard } from "../../services/actions/actions";

export default function BurgerElement({ item, index, handleClose, onDragStartHandler, onDragEndHandler, onDragOverHandler, onDragLeaveHandler, onDropDropHandler}) {
  return (
      <li key={index} 
      className={styles.component} 
      draggable={true}      
      onDragStart={e => {
        e.stopPropagation();
        onDragStartHandler(e, item);
      }}
      onDragEnd={e => {
        e.stopPropagation();
        onDragEndHandler(e);
      }}
      onDragOver={e => {
        e.stopPropagation();
        onDragOverHandler(e);
      }}
      onDragLeave={e => {
        e.stopPropagation();
        onDragLeaveHandler(e);
      }}
      onDrop={e => {
        e.preventDefault();
        onDropDropHandler(e, item);
      }}
      >
        <ConstructorElement
          text={item.name}
          price={item.price}
          thumbnail={item.image}
          handleClose={() => handleClose(item)}
          index={index}
        />
      </li>
    )
}
