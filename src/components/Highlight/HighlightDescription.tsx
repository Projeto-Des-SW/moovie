import classes from "./Highlight.module.css";

function HighlightDescription({description}: {description: string}) {
    return (
        <div className={classes.info}>
            <p className="body-large">{description}</p>
        </div>
    )
}

export default HighlightDescription;