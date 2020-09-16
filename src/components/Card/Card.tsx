import React, { FC, useEffect, useState } from "react" 
import { Link } from "react-router-dom" 
import classes from './Card.module.scss' 
import btn from '../../cssModules/cssButtons.module.scss' 
import { connect } from "react-redux" 
import { AppState } from "../../store/rootStore" 
import { CartCard } from "../../Types" 
import { faCartPlus } from "@fortawesome/free-solid-svg-icons" 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" 
import { addToCard,addCartCard } from "../../store/cartReducer" 

const Card:FC<AllProps> = ({isAuth,brand,title,price,commentCount,photoURL,cardId,addToCard,disabledButtons,cartCards,addCartCard}) => {
    const[isAdded,setIsAdded] = useState(false)

    useEffect(() => {
        if(cartCards.find(card => card.cardId === cardId)){
            setIsAdded(true)
        } else {
            setIsAdded(false)
        }
    },[cartCards,cardId])

    const addNewCardHandle = () => {
        if(isAuth){
            addCartCard({ cardId, photoURL,title,price, count: 1})
        } else {
            addToCard( { cardId, photoURL, title, price, count: 1 })
        }
    }

    return (
        <li className={classes.card}>
            <Link  to={`/card/${cardId}`}>
                <img className={classes.img} src={photoURL} alt={brand}/>
            </Link>
            <Link to={`/card/${cardId}`} className={classes.name}>{title}</Link>
            <div className={classes.rate}>
                <span className={classes.price}>$ {price}</span>
                <span>{commentCount} comments</span>
            </div>
            <div className={classes.actions}>
                {
                    !isAdded ? <button disabled={disabledButtons.some(btn => btn === cardId)} onClick={addNewCardHandle} className={`${btn.btnBlue} ${classes.buyBtn}`}>
                        <span>Add To </span>
                        <FontAwesomeIcon icon={faCartPlus} size="lg" color='#ffffff'/>
                    </button>
                        : <button disabled className={`${btn.btnBlue} ${classes.button}`}>
                            <span>Added</span>
                        </button>
                }
                <Link className={`${btn.btnGrey} ${classes.moreBtn}`} to={`/card/${cardId}`}>
                    More Info
                </Link>
            </div>
        </li>
    )
}

type StateProps = {
    cartCards: Array<CartCard> 
    disabledButtons: Array<string> 
    isAuth: boolean 
}

type DispatchProps = {
    addToCard: (card: CartCard) => void 
    addCartCard: (card: CartCard) => void 
}

type OwnProps = {
    commentCount: number 
    brand: string 
    title: string 
    price: number 
    photoURL: string 
    cardId: string 
}

const mapStateToProps = (state:AppState):StateProps => ({
    isAuth: state.auth.isAuth,
    cartCards: state.cart.cards,
    disabledButtons: state.cart.disabledButtons
})

type AllProps = StateProps & DispatchProps & OwnProps

export default connect<StateProps, DispatchProps, OwnProps, AppState>(mapStateToProps, { addToCard,addCartCard })(Card) 