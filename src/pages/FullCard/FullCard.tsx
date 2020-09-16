import React, { FC, useEffect, useState } from "react"
import { connect } from "react-redux" 
import classes from './FullCard.module.scss'
import btn from '../../cssModules/cssButtons.module.scss'
import { CartCard, FullCardType } from "../../Types" 
import { AppState } from "../../store/rootStore" 
import { useParams } from "react-router-dom" 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" 
import { faCartPlus } from "@fortawesome/free-solid-svg-icons" 
import { getCardById } from "../../store/fullCardReducer" 
import Header from "../../components/Header/Header" 
import CardComments from "../../components/CardComments/CardComments" 
import Preloader from "../../components/common/Preloader/Preloader" 
import { addCartCard, addToCard } from "../../store/cartReducer" 

const FullCard:FC<AllProps> = ({card,cartCards,getCardById,getCardFetching,isAuth,addCartCard,addToCard,disabledButtons}) => {
    const[activePhoto,setActivePhoto] = useState(0)
    const[isAdded,setIsAdded] = useState(false)

    useEffect(() => {
        if(cartCards.find(card => card.cardId === cardId)){
            setIsAdded(true)
        } else {
            setIsAdded(false)
        }
    },[cartCards])

    const params = useParams<{cardId: string}>()
    const cardId = params.cardId

    useEffect(() => {
        getCardById(cardId)
    },[])

    const addNewCardHandle = () => {
        if(card) {
            const photoURL = card.photoURL[0]
            const title = card.title
            const price = card.price
            if (isAuth) {
                addCartCard({cardId, photoURL, title, price, count: 1})
            } else {
                addToCard({cardId, photoURL, title, price, count: 1})
            }
        }
    }

    return (
        <>
            <Header/>
            <div className={classes.fullCard}>
                {
                    !getCardFetching && card ?
                        <>
                            <div className={classes.photoContainer}>
                                <div className={classes.imgNav}>
                                {
                                    card.photoURL.map((photo,index) => {
                                        return (
                                            <div key={photo} onClick={() => {setActivePhoto(index)}}
                                                 className={activePhoto === index ? `${classes.imgItem} ${classes.imgItemActive}` : classes.imgItem}>
                                                <img src={photo} alt={card!.brand}/>
                                            </div>
                                        )
                                    })
                                }
                                </div>
                                <img className={classes.photo} src={card.photoURL[activePhoto]} alt={card!.brand}/>
                            </div>
                            <div className={classes.content}>
                                <div className={classes.title}>{card.title}</div>
                                <div className={classes.buy}>
                                    <div className={classes.price}>$ {card.price}</div>
                                    <div style={{marginLeft: '20px'}}>
                                        {
                                            !isAdded ? <button disabled={disabledButtons.some(btn => btn === cardId)} onClick={addNewCardHandle} className={`${btn.btnBlue} ${classes.buyBtn}`}>
                                                    <span>Add To </span>
                                                    <FontAwesomeIcon icon={faCartPlus} size="lg" color='#ffffff'/>
                                                </button>
                                                : <button disabled className={`${btn.btnBlue} ${classes.button}`}>
                                                    <span>Added</span>
                                                </button>
                                        }
                                    </div>
                                </div>
                                <div className={classes.about}>{card.about}</div>
                                <CardComments cardId={card.cardId} comments={card.comments}/>
                            </div>
                        </>
                        : <Preloader/>
                }
            </div>
        </>
    )
}

type OwnProps = {}

type StateProps = {
    card: FullCardType | null 
    getCardFetching: boolean 
    isAuth: boolean 
    cartCards: Array<CartCard> 
    disabledButtons: Array<string> 
}

type DispatchProps = {
    getCardById: (cardId: string) => void 
    addToCard: (card: CartCard) => void 
    addCartCard: (card: CartCard) => void 
}

type AllProps = StateProps & DispatchProps & OwnProps

const mapStateToProps = (state:AppState):StateProps => ({
    card: state.fullCard.card,
    getCardFetching: state.fullCard.getCardFetching,
    disabledButtons: state.cart.disabledButtons,
    cartCards: state.cart.cards,
    isAuth: state.auth.isAuth
})

export default connect<StateProps,DispatchProps,OwnProps,AppState>(mapStateToProps, { getCardById,addToCard,addCartCard })(FullCard)