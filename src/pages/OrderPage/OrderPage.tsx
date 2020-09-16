import React, {FC, useEffect, useMemo, useState} from "react" 
import { connect } from "react-redux" 
import classes from './OrderPage.module.scss' 
import btn from '../../cssModules/cssButtons.module.scss'
import { CartCard, OrderCardData, UserData } from "../../Types" 
import useInput from "../../hooks/useInput" 
import { AppState } from "../../store/rootStore" 
import { makeOrder } from "../../store/ordersReducer" 
import { setTotalPrice } from "../../store/cartReducer" 
import { Link,  Redirect } from "react-router-dom" 
import CredErrorBlock from "../../components/common/CredErrorBlock/CredErrorBlock" 

const OrderPage:FC<AllProps> = ({userData,cards,totalPrice,makeOrder,makeOrderSuccess, setTotalPrice}) => {
    const firstName = useInput(userData ? userData.firstName : '')
    const lastName = useInput(userData ? userData.lastName : '')
    const phoneNumber = useInput('')
    const[formError, setFormError] = useState(false)

    useEffect(() => {
        if(userData){
            firstName.setInputValue(userData.firstName)
            lastName.setInputValue(userData.lastName)
        }
    },[userData])

    useEffect(() => {
        setTotalPrice(cards.reduce((sum,card) => sum + +card.price * +card.count,0))
    },[cards])

    const cardsData = useMemo(() => {
        return cards.map(card => ({cardId:card.cardId,count:card.count}))
    },[cards])

    const submitHandler = (e: any) => {
        setFormError(false)
        e.preventDefault()
        if(phoneNumber.value.match(/^((\+?3)?8)?((0\(\d{2}\)?)|(\(0\d{2}\))|(0\d{2}))\d{7}$/)){
            makeOrder(firstName.value,lastName.value,phoneNumber.value,cardsData,totalPrice)
        } else {
            setFormError(true)
        }
    }

    if(makeOrderSuccess){
        return <div className={classes.checkoutSuccess}>
            <span>Checkout success, we will contact you soon</span>
            <Link to="/">Come back to Main Page</Link>
        </div>
    }

    if(cards.length < 1) {
       return <Redirect to='/'/>
    }

    return (
        <div className={classes.orderPage}>
            <h1 className={classes.mainTitle}>Checkout</h1>
            <div className={classes.checkout}>
                <div className={classes.contacts}>
                    <h2 className={classes.title}>Your contact details: </h2>
                    <form className={classes.form}>
                        <CredErrorBlock errorMessage={formError ? 'phone number is not correct' : null} />
                        <div>
                            <label htmlFor="brand">first name: </label>
                            <input className={classes.input} {...firstName.bind} id="brand" required/>
                        </div>
                        <div>
                            <label htmlFor="brand">last name: </label>
                            <input className={classes.input} {...lastName.bind} id="brand" required/>
                        </div>
                        <div>
                            <label htmlFor="brand">phone number: </label>
                            <input className={classes.input} {...phoneNumber.bind} type="number" id="brand" required/>
                        </div>
                        <button onClick={submitHandler} className={btn.btnBlue} type='submit'>confirm checkout</button>
                    </form>
                </div>
                <div className={classes.order}>
                    <h2 className={classes.title}>Order: </h2>
                    {
                        cards.map(card => {
                            const cost = +card.count * +card.price 
                            return (
                                <div className={classes.goods} key={card.cardId}>
                                    <img src={card.photoURL} className={classes.img} alt='phone'/>
                                    <div className={classes.cardTitle}>{card.title}</div>
                                    <div className={classes.cardInfo}>
                                        <span className={classes.carInfoTitle}>price</span>
                                        <span className={classes.carInfoValue}>{card.price} $</span>
                                    </div>
                                    <div className={classes.cardInfo}>
                                        <span className={classes.carInfoTitle}>count</span>
                                        <span className={classes.carInfoValue}>{card.count}</span>
                                    </div>
                                    <div className={classes.cardInfo}>
                                        <span className={classes.carInfoTitle}>cost</span>
                                        <span className={classes.carInfoValue}>{cost} $</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className={classes.cost}>
                        <span>Total Cost </span>
                        <span>{totalPrice} $</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

type StateProps = {
    cards: Array<CartCard> 
    totalPrice: number 
    userData: UserData | null 
    makeOrderSuccess: boolean 
}

type DispatchProps = {
    makeOrder: (firstName:string, lastName:string, phoneNumber:string, cardsDataArr:Array<OrderCardData>,totalPrice:number) => void 
    setTotalPrice: (price:number) => void 
}

type OwnProps = {}

type AllProps = StateProps & DispatchProps & OwnProps

const mapStateToProps = (state: AppState): StateProps => ({
    cards: state.cart.cards,
    totalPrice: state.cart.totalPrice,
    makeOrderSuccess: state.orders.makeOrderSuccess,
    userData: state.auth.userData
})

export default connect<StateProps, DispatchProps, OwnProps, AppState>(mapStateToProps, { makeOrder,setTotalPrice })(OrderPage) 