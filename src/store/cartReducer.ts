import { CartCard } from "../Types" 
import { AppActions, CartActions } from "./actionsTypes" 
import { Dispatch } from "redux" 
import { cartApi } from "../api/api" 
import {AppState} from "./rootStore" 

const initialState = {
    cards: [] as [] | Array<CartCard>,
    totalPrice: 0,
    disabledButtons: [] as [] | Array<string>
}

type InitialStateType = typeof initialState 

const updateCount = (state:InitialStateType,cardId:string, count:number) => {
    return {
        ...state,
        // @ts-ignore
        cards: state.cards.map((card) => {
            if(card.cardId === cardId){
                return {...card, count: card.count + count}
            }
            return {...card}
        })
    }
}

export const cartReducer = (state = initialState, action:CartActions):InitialStateType => {
    switch (action.type) {
        case "SET_CART_CARDS":
            return {
                ...state,
                cards: action.cards
            }
        case "ADD_TO_CART":
            return {
                ...state,
                cards: [...state.cards, action.card]
            }
        case "SET_CART_CARD_FETCHING":
            return {
                ...state,
                disabledButtons: action.isFetching
                    ? [...state.disabledButtons, action.cardId]
                    : state.disabledButtons.filter(cardId => cardId !== action.cardId)
            }
        case "INCREASE_COUNT":
            return updateCount(state,action.cardId, 1 )
        case "DECREASE_COUNT":
            return updateCount(state,action.cardId, -1 )
        case "SET_TOTAL_PRICE":
            return {
                ...state,
                totalPrice: action.price
            }
        case "DELETE_CARD":
            return {
                ...state,
                cards: state.cards.filter(card => card.cardId !== action.cardId),
            }
        default:
            return state
    }
}

export const setCartCards = (cards: Array<CartCard>):CartActions => ({type: "SET_CART_CARDS", cards})
export const addToCard = (card:CartCard):CartActions => ({type:"ADD_TO_CART", card })
const setAddCartCardFetching = (cardId: string, isFetching: boolean):CartActions => ({type:"SET_CART_CARD_FETCHING", cardId, isFetching})
export const increaseCount = (cardId:string):CartActions => ({type:"INCREASE_COUNT", cardId})
export const decreaseCount = (cardId:string):CartActions => ({type:"DECREASE_COUNT", cardId})
export const setTotalPrice = (price:number):CartActions => ({type:"SET_TOTAL_PRICE", price})
export const deleteCard = (cardId:string):CartActions => ({type:"DELETE_CARD", cardId})

export const getCartCards = () => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const firstName = getState().auth.userData!.firstName
    const lastName = getState().auth.userData!.lastName
    const res = await cartApi.getAllCartCards(firstName,lastName)
    if(res.status === 200){
        dispatch(setCartCards(res.data))
    }
}

export const addCartCard = (card:CartCard) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(setAddCartCardFetching(card.cardId,true))
    const firstName = getState().auth.userData!.firstName
    const lastName = getState().auth.userData!.lastName
    const res = await cartApi.addCartCard(card.cardId,firstName,lastName,card.photoURL,card.title,card.price,card.count)
    if(res.status === 200){
        dispatch(addToCard(res.data))
        dispatch(setAddCartCardFetching(card.cardId,false))
    }
}

export const deleteCartCards = (cartCardId: string, cardId: string) => async (dispatch: Dispatch<AppActions>) => {
    const res = await cartApi.deleteCartCard(cartCardId, cardId)
    if(res.status === 200){
        dispatch(deleteCard(cardId))
        dispatch(decreaseCount(cardId))
    }
}

export const increaseCountForAuthUser = (cardId: string, cartCardId: string) => async (dispatch: Dispatch<AppActions>) => {
    const res = await cartApi.increaseCount(cartCardId)
    if(res.status === 200){
        dispatch(increaseCount(cardId))
    }
}

export const decreaseCountThunkForAuthUser = (cardId: string, cartCardId: string) => async (dispatch: Dispatch<AppActions>) => {
    const res = await cartApi.decreaseCount(cartCardId)
    if(res.status === 200){
        dispatch(increaseCount(cardId))
    }
}