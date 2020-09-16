import React, { FC, useMemo } from "react" 
import classes from "./CardFromCart.module.scss" 
import { connect } from "react-redux" 
import { AppState } from "../../store/rootStore" 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" 
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons" 
import { decreaseCount, increaseCount,deleteCard,deleteCartCards,increaseCountForAuthUser,decreaseCountThunkForAuthUser } from "../../store/cartReducer" 
import {Link} from "react-router-dom" 

const CardFromCart:FC<AllProps> = ({isAuth,deleteCartCards,decreaseCountThunkForAuthUser,increaseCountForAuthUser,cartCardId,title,price,photoURL,count,cardId,increaseCount,decreaseCount,deleteCard}) => {

    const totalPrice = useMemo(() => {
        return count * price
    }, [price,count]) 

    const onIncrease = () => {
        if(isAuth){
            increaseCountForAuthUser(cardId, cartCardId!)
        } else {
            increaseCount(cardId)
        }
    }

    const onDecrease = () => {
        if(count === 1){
            onDelete()
        } else {
            if(isAuth){
                decreaseCountThunkForAuthUser(cardId, cartCardId!)
            } else {
                decreaseCount(cardId)
            }
        }
    }

    const onDelete = () => {
        if(isAuth){
            deleteCartCards(cartCardId!,cardId)
        } else {
            deleteCard(cardId)
        }
    }

    return (
        <div className={classes.card}>
            <Link  to={`/card/${cardId}`} className={classes.product}>
                <img className={classes.img}
                     src={photoURL}
                     alt="phone"/>
                <span className={classes.name}>{title}</span>
            </Link>
            <div className={classes.quantity}>
                <button onClick={onDecrease} className={classes.btn}>-</button>
                <span className={classes.totalQuantity}>{count}</span>
                <button onClick={onIncrease} className={classes.btn}>+</button>
            </div>
            <div className={classes.price}>${price}</div>
            <div className={classes.total}>${totalPrice}</div>
            <button onClick={onDelete} className={classes.removeItem}>
                <FontAwesomeIcon  icon={faTrashAlt} size="2x"  color='rgb(48,111,180)'/>
            </button>
        </div>
    )
}

type OwnProps = {
    cartCardId?: string
    cardId: string 
    photoURL: string 
    title: string 
    price: number 
    count: number
}

type StateProps = {
    isAuth: boolean 
}

type DispatchProps = {
    increaseCount: (cardId: string) => void 
    decreaseCount: (cardId: string) => void 
    deleteCard: (cardId: string) => void 
    deleteCartCards: (cartCardId: string,cardId: string) => void 
    increaseCountForAuthUser: (cardId: string, cartCardId: string) => void 
    decreaseCountThunkForAuthUser: (cardId: string, cartCardId: string) => void 
}

type AllProps = StateProps & DispatchProps & OwnProps 

const mapStateToProps = (state:AppState):StateProps => ({
    isAuth: state.auth.isAuth
})

export default connect<StateProps, DispatchProps, OwnProps, AppState>(mapStateToProps, {
    increaseCount,decreaseCount,deleteCard,
    deleteCartCards,increaseCountForAuthUser,
    decreaseCountThunkForAuthUser
})(CardFromCart) 