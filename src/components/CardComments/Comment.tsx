import React, { FC } from "react"
import classes from "./CardComments.module.scss" 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" 
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons" 
import moment from "moment" 
import { CommentData } from "../../Types"

const Comment:FC<AllProps> = ({comment,isAuthUser,onDelete}) => {

    const deleteHandle = () => {
        onDelete!(comment.commentId)
    }

    return (
        <li className={classes.comment}>
            <div className={classes.commentTop}>

                <span className={classes.user}>{`${comment.firstName} ${comment.lastName}`}</span>
                <span className={classes.createdAt}>{moment(comment.createdAt).calendar()}</span>
                {
                    isAuthUser && <button className={classes.deleteBtn} onClick={deleteHandle}>
                        <FontAwesomeIcon  icon={faTrashAlt} size="1x"  color='rgb(48,111,180)'/>
                    </button>
                }
            </div>
            <div className={classes.body}>{comment.body}</div>
        </li>
    )
}

type OwnProps = {
    comment: CommentData 
    isAuthUser?: boolean 
    onDelete?: (commentId: string) => void
}

type AllProps = OwnProps

export default Comment