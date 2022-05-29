import React from "react";
import styles from "../burger-ingredients/burger-ingredients.module.css";
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";

export default function BurgerIngredient(props) {

   const [isOpen, setState] = React.useState({ isOpen: false });

//    function handleOpen() {
//      setState({ isOpen: true });
//   }

  return props.ingredients.map((el, ind) =>
    <>
      <div key={ind} className={styles.optioncard} >
        <img src={el.image} />
        <p className={styles.optiontext}>{el.name}</p>
        {isOpen === true ? <ModalOverlay props={props.ingredients} /> : !isOpen}
      </div>
    </>
  );
}

// BurgerIngredient.propTypes = {
//   name: PropTypes.string,
//   image: PropTypes.string,
// };
