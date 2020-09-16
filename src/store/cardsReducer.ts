import { cardsApi } from "../api/api"
import { Dispatch } from "redux"
import { AppActions, CardsActions } from "./actionsTypes"
import { CardType, BrandType } from "../Types"
import { app } from "../FBconfig/config"

const initialState = {
    cardsLength: null as null | number,
    cards: [] as [] | Array<CardType>,
    addNewCardFetching: false,
    getAllCardsFetching: false,
    brands: [] as [] | Array<string>,
    filter: 'comments'
}

type initialStateType = typeof initialState

const updateCommentCount = (state:initialStateType, cardId: string, number: number):initialStateType => {
    return {
        ...state,
        // @ts-ignore
        cards: state.cards.map(card => {
            if(card.cardId === cardId){
                return {...card, commentCount: card.commentCount + number}
            }
            return {...card}
        })
    }
}

export const cardsReducer = (state = initialState, action:CardsActions):initialStateType => {
    switch (action.type) {
        case "SET_CARDS_LENGTH":
            return {
                ...state,
                cardsLength: action.length
            }
        case "SET_CARDS":
            return {
                ...state,
                cards: action.cards
            }
        case "SET_ADD_NEW_CARD_FETCHING":
            return {
                ...state,
                addNewCardFetching: action.isFetching
            }
        case "SET_EXTRA_CARDS":
            return {
                ...state,
                cards: [...state.cards, ...action.cards]
            }
        case "SET_GET_ALL_CARDS_FETCHING":
            return {
                ...state,
                getAllCardsFetching: action.isFetching
            }
        case "SET_ALL_BRANDS":
            return {
                ...state,
                brands: action.brands
            }
        case "SET_FILTER":
            return {
                ...state,
                filter: action.filter
            }
        case "UPDATE_CARD_COMMENT_COUNT":
            return updateCommentCount(state, action.cardId, action.number)
        default:
            return state
    }
}

export const updateCardCommentCount = (cardId: string, number: number):CardsActions => ({type: "UPDATE_CARD_COMMENT_COUNT", cardId, number})
const setCardsLength = (length:number):CardsActions => ({type: "SET_CARDS_LENGTH", length})
const setCards = (cards:Array<CardType>):CardsActions => ({type:"SET_CARDS", cards})
const SetAddNewCardFetching = (isFetching:boolean):CardsActions => ({type: "SET_ADD_NEW_CARD_FETCHING", isFetching})
const setExtraCards = (cards:Array<CardType>):CardsActions => ({type:"SET_EXTRA_CARDS", cards})
const setGetAllCardsFetching = (isFetching:boolean):CardsActions => ({type:"SET_GET_ALL_CARDS_FETCHING", isFetching})
const setAllBrands = (brands:BrandType):CardsActions => ({type: "SET_ALL_BRANDS", brands})
export const setFilter = (filter:string):CardsActions => ({type: "SET_FILTER", filter})

export const getCardsLength = (brand:string) => async (dispatch: Dispatch<AppActions>) => {
    const res = await cardsApi.getCardsLength(brand)
    if(res.status === 200){
        dispatch(setCardsLength(res.data.length))
    }
}

export const getAllCards = () => async (dispatch: Dispatch<AppActions>) => {
    dispatch(setGetAllCardsFetching(true))
    const res = await cardsApi.getAllCards()
    if(res.status === 200){
        dispatch(setCards(res.data))
        dispatch(setGetAllCardsFetching(false))
    }
}

const expendFile = async (file: HTMLInputElement):Promise<string | undefined> => {
    if(file.type.split('/')[1] === 'png' || file.type.split('/')[1] === 'jpeg'){
        const storageRef = app.storage().ref()
        const fileRef = storageRef.child(file.name)
        // @ts-ignore
        await fileRef.put(file)
        await fileRef.getDownloadURL()
        return await fileRef.getDownloadURL()
    }
}

export const AddNewCard = (brand: string, title: string, about: string, price: number, files: Array<HTMLInputElement>) =>  async (dispatch: Dispatch<AppActions>) => {
    dispatch(SetAddNewCardFetching(true))
    const photoArray:Array<string> = []
    for(let i = 0; i < files.length; i++){
        const file = await expendFile(files[i])
        if(file){
            await photoArray.push(file)
        }
    }
    const res = await cardsApi.addNewCard(brand,title,about,price,photoArray)
    if(res.status === 200){
        dispatch(SetAddNewCardFetching(false))
    }
}

export const uploadExtraCards = (size:number,brand:string) => async (dispatch: Dispatch<AppActions>) => {
    const res = await cardsApi.uploadExtraCards(size,brand)
    if (res.status === 200) {
        dispatch(setExtraCards(res.data))
    }
}

export const getCardsByBrand = (brand:string) => async (dispatch: Dispatch<AppActions>) => {
    dispatch(setGetAllCardsFetching(true))
    const res = await cardsApi.getCardsByBrand(brand)
    if(res.status === 200){
        dispatch(setCards(res.data))
        dispatch(setGetAllCardsFetching(false))
    }
}

export const getAllBrands = () => async (dispatch: Dispatch<AppActions>) => {
    const res = await cardsApi.getAllBrands()
    if(res.status === 200){
        dispatch(setAllBrands(res.data))
    }
}
