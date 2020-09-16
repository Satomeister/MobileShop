import React, {FC, useMemo, useState, useEffect} from "react" 
import { connect } from "react-redux" 
import classes from "./CardComments.module.scss" 
import btn from '../../cssModules/cssButtons.module.scss'
import { AppState } from "../../store/rootStore" 
import {CommentData, UserData} from "../../Types" 
import useInput from "../../hooks/useInput" 
import Comment from "./Comment" 
import { sendComment,removeComment } from "../../store/fullCardReducer" 
import CommentModal from "./CommentModal" 
import { Link } from "react-router-dom" 

const CardComments:FC<AllProps> = ({comments,cardId,isAuth,userData,sendComment,sendCommentFetching,removeComment}) => {
    const comment = useInput('')
    const[isCommentModal,setIsCommentModal] = useState(false)

    const submitHandle = (e:any) => {
        e.preventDefault() 
        sendComment(cardId, comment.value)
    }

    const filteredComments = useMemo(() => {
        return comments.sort((a,b) => a.createdAt > b.createdAt ? 1 : -1)
    },[comments])

    useEffect(() => {
        if(!sendCommentFetching){
            setIsCommentModal(false)
            comment.clear()
        }
    },[sendCommentFetching])

    const closeModal = () => {
        setIsCommentModal(false)
        comment.clear()
    }

    const deleteCommentHandler = (commentId: string) => {
        removeComment(commentId,cardId)
    }

    return (
        <div className={classes.commentsContainer}>
            <h2 className={classes.title}>Comments</h2>
            <ul className={classes.comments}>
                {
                    filteredComments.map(comment => {
                        if(userData && `${comment.firstName}_${comment.lastName}` === `${userData.firstName}_${userData.lastName}`){
                            return (
                                <Comment comment={comment} key={comment.commentId} isAuthUser onDelete={deleteCommentHandler}/>
                            )
                        }
                        return (
                            <Comment comment={comment} key={comment.commentId}/>
                        )
                    })
                }
            </ul>
            {
                isAuth
                    ? <div className={classes.formTitle}>
                    <span>Leave you comment here</span>
                    <button onClick={() => {setIsCommentModal(true)}} className={btn.btnBlue}>
                        Leave Comment
                    </button>
                </div>
                : <div className={classes.formTitle}>
                        <span>In order to Leave comment <Link to="/login">Login</Link>, please</span>
                    </div>
            }
            <CommentModal
                submitHandle={submitHandle}
                comment={comment}
                closeModal={closeModal}
                isModal={isCommentModal}
                isFormFetching={sendCommentFetching}
            />

        </div>
    )
}

type OwnProps = {
    comments: Array<CommentData> 
    cardId: string
}

type StateProps = {
    sendCommentFetching: boolean 
    userData: UserData | null 
    isAuth: boolean 
}

type DispatchProps = {
    sendComment: (cardId: string, comment: string) => void 
    removeComment: (commentId: string, cardId: string) => void 
}

type AllProps = OwnProps & StateProps & DispatchProps

const mapStateToProps = (state:AppState):StateProps => ({
    sendCommentFetching: state.fullCard.sendCommentFetching,
    userData: state.auth.userData,
    isAuth: state.auth.isAuth
})

export default connect<StateProps,DispatchProps,OwnProps,AppState>(mapStateToProps, { sendComment,removeComment })(CardComments)