import React from "react";
import PropTypes from "prop-types";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";

export default function IngredientsCategory( {props} ) {
    return ( props.map((el, ind) => <BurgerIngredient key={ind} name={el.name} image={el.image} />)) ;
}

IngredientsCategory.propTypes = {
    props: PropTypes.array,
};