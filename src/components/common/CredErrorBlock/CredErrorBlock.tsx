import React, { FC } from "react" 
import classes from './CredErrorBlock.module.css'

const CredErrorBlock:FC<OwnProps> = ({errorMessage}) => {

    if(errorMessage){
        return (
            <div className={classes.credErrorBlock}>
                {errorMessage}
            </div>
        )
    }
    
    return null
}

type OwnProps = {
    errorMessage: string | null
}

export default CredErrorBlock