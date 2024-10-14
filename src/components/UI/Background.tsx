import classes from "./Background.module.css";
import React from "react";

const IMG_URL: string = import.meta.env.VITE_IMG;

interface BackgroundProps {
    image: string;
    children: React.ReactNode;
}

function Background(props: BackgroundProps) {
    return (
        <div style={{backgroundImage: `url(${IMG_URL}${props.image})`}}
            className={classes.background}
        >
            {props.children}
        </div>
    )
}

export default Background;