import classes from "./Button.module.css";

function ButtonLoadMore(props) {
    return (
        <button className={`${classes.button} ${classes['button-outlined']} ${classes['button-load-more']}`} {...props}>{props.children}</button>
    );
}

export default ButtonLoadMore;