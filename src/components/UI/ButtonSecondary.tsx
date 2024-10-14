import classes from './Button.module.css';

function ButtonSecondary(props: any) {
    return (
        <button className={classes.button + ' ' + classes['button-secondary']} {...props}>{props.children}</button>
    )
}

export default ButtonSecondary;