import React, { FC, useEffect } from "react"
import classes from './Cart.module.scss' 
import btn from '../../cssModules/cssButtons.module.scss' 
import { connect } from "react-redux" 
import { Link } from "react-router-dom" 
import { CartCard } from "../../Types" 
import { AppState } from "../../store/rootStore" 
import CardFromCart from "../../components/CardFromCart/CardFromCart" 
import { setTotalPrice } from "../../store/cartReducer" 
import Header from "../../components/Header/Header" 

const Cart:FC<AllProps> = ({isAuth,cards,totalPrice,setTotalPrice}) => {

    useEffect(() => {
        setTotalPrice(cards.reduce((sum,card) => sum + +card.price * +card.count,0))
    },[cards])

    return (
        <>
            <Header/>
            <div className={classes.cart}>
                <div className={classes.header}>
                    <div className={`${classes.title} ${classes.productTitle}`}>
                        Product
                    </div>
                    <div className={classes.title}>
                        Quantity
                    </div>
                    <div className={classes.title}>
                        Price
                    </div>
                    <div className={classes.title}>
                        Cost
                    </div>
                </div>
                <div className={classes.products}>
                    {
                        cards.length !== 0 ? cards.map(card => {
                                return <CardFromCart {...card} key={card.cardId}/>
                            })
                            : <div className={classes.emptyCards}>You have no items yet</div>
                    }
                </div>
                <div className={classes.totalPrice}>
                    <span>Total Cost </span>
                    <span className={classes.price}>{totalPrice} $</span>
                </div>
                <div className={classes.actions}>
                    <Link to='/' className={btn.btnGrey}>Continue Shopping</Link>
                    {
                        totalPrice ? <Link to='/order' className={btn.btnGreen}>Checkout</Link>
                            : <button disabled >Checkout</button>
                    }
                </div>
            </div>
        </>
    )
}
type StateProps = {
    isAuth: boolean 
    cards: Array<CartCard> 
    totalPrice: number 
}

type DispatchProps = {
    setTotalPrice: (price:number) => void 
}

type OwnProps = {
}

type AllProps = StateProps & DispatchProps & OwnProps

const mapStateToProps = (state:AppState):StateProps=> ({
    isAuth: state.auth.isAuth,
    cards: state.cart.cards,
    totalPrice: state.cart.totalPrice
})

export default connect<StateProps, DispatchProps, OwnProps, AppState>(mapStateToProps, { setTotalPrice })(Cart) 