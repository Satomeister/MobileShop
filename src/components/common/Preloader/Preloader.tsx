import classes from "./Preloader.module.scss" 
import React from "react" 

const Preloader = () => {
    return (
        <div className={classes.loaderContainer}>
            <div className={classes.loader}>loading...</div>
        </div>
    )
}

export default Preloader