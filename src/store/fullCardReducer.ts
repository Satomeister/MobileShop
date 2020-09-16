import { Dispatch } from "redux" 
import { AppActions, FullCardActions } from "./actionsTypes" 
import { cardsApi, commentsApi } from "../api/api" 
import { FullCardType, CommentData } from "../Types" 
import {AppState} from "./rootStore" 
import { updateCardCommentCount } from "./cardsReducer" 

const initialState = {
    card: null as FullCardType | null,
    getCardFetching: false,
    sendCommentFetching: false
}

type initialStateType = typeof initialState

export const fullCardReducer = (state = initialState, action: FullCardActions):initialStateType => {
    switch (action.type) {
        case "SET_CARD":
            return {
                ...state,
                card: action.card
            }
        case "SET_GET_CARD_FETCHING":
            return {
                ...state,
                getCardFetching: action.isFetching
            }
        case "SEND_COMMENT":
            return {
                ...state,
                // @ts-ignore
                card: {...state.card, comments: [...state.card!.comments, action.comment]}
            }
        case "SEND_COMMENT_FETCHING":
            return {
                ...state,
                sendCommentFetching: action.isFetching
            }
        case "DELETE_COMMENT":
            return {
                ...state,
                // @ts-ignore
                card: {...state.card, comments: state.card!.comments.filter(comment => comment.commentId !== action.commentId)}
            }
        default:
            return state
    }
}

const setCard = (card:FullCardType):FullCardActions => ({type:"SET_CARD",card})
const SetGetCardFetching = (isFetching:boolean):FullCardActions => ({type:"SET_GET_CARD_FETCHING",isFetching})
const makeComment = (comment: CommentData):FullCardActions => ({type: "SEND_COMMENT", comment})
const sendCommentFetching = (isFetching: boolean):FullCardActions => ({type: "SEND_COMMENT_FETCHING", isFetching})
const deleteComment = (commentId: string):FullCardActions => ({type: "DELETE_COMMENT", commentId})

export const getCardById = (cardId:string) => async (dispatch: Dispatch<AppActions>) => {
    dispatch(SetGetCardFetching(true))
    const res = await cardsApi.getCardById(cardId)
    if(res.status === 200){
        dispatch(setCard(res.data))
        dispatch(SetGetCardFetching(false))
    }
}

export const sendComment = (cardId: string, comment: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(sendCommentFetching(true))

    const firstName = getState().auth.userData!.firstName
    const lastName = getState().auth.userData!.lastName

    const res = await commentsApi.makeComment(cardId, comment, firstName, lastName)
    if(res.status === 200){
        dispatch(makeComment({...res.data}))
        dispatch(updateCardCommentCount(cardId, 1))
        dispatch(sendCommentFetching(false))
    }
}

export const removeComment = (commentId: string,cardId: string) => async (dispatch: Dispatch<AppActions>) => {
    const res = await commentsApi.deleteComment(commentId,cardId)
    if (res.status === 200) {
        dispatch(deleteComment(commentId))
        dispatch(updateCardCommentCount(cardId, -1))
    }
}