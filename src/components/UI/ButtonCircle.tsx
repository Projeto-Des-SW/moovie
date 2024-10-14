import classes from "./Button.module.css";
import React from "react";

interface ButtonProps {
    favoriteOrAdded: boolean;
}

function ButtonCircle({favoriteOrAdded, ...props } : ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement> ) {
    const styles = favoriteOrAdded ? classes['button-checked'] : '';

    return (
        <button className={classes.button + ' ' + classes['button-outlined'] + ' ' + classes['button-circle'] + ' ' + styles} {...props} >{props.children}</button>
    )
}

export default ButtonCircle;