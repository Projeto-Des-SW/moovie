import classes from "./Button.module.css";

function ButtonPrimary(props: any) {
    return (
        <button className={classes.button + ' ' + classes['button-primary']} {...props}>{props.children}</button>
    )
}

export default ButtonPrimary;