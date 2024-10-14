import classes from "./Button.module.css";

function ButtonRounded(props: any) {
    return (
        <button className={classes.button + ' ' + classes['button-rounded']} {...props}>{props.children}</button>
    )
}

export default ButtonRounded;