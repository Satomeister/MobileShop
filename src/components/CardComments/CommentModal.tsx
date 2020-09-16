import React, { FC, useRef } from "react" 
import classes from "./CardComments.module.scss" 
import btn from '../../cssModules/cssButtons.module.scss'

const CommentModal:FC<OwnProps> = ({isModal,comment,submitHandle,isFormFetching,closeModal}) => {

    const modalWrap = useRef<HTMLDivElement>(null)
    const handleClickOutside = (e:any) => {
        if (e.target === modalWrap.current) {
            closeModal()
        }
    }

    if(isModal) {
        return (
            <div className={classes.commentModal} onMouseDown={handleClickOutside} ref={modalWrap}>
                <div className={classes.modal}>
                    <h1 style={{textAlign: 'center'}}>Your Comment</h1>
                    <form className={classes.form} onSubmit={submitHandle}>
                        <textarea rows={5} {...comment.bind}/>
                        <button disabled={isFormFetching} className={btn.btnBlue /*commentButton*/} type="submit">send</button>
                    </form>
                </div>
            </div>
        )
    } else return null
}

type OwnProps = {
    isModal: boolean 
    submitHandle: (e:any) => void 
    comment: {
        bind: {
            value: string 
            onChange: (event:any) => void 
        } 
        value: string 
        clear: () => void 
    } 
    isFormFetching: boolean 
    closeModal: () => void 
}

export default CommentModal