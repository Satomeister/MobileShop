import { CardType, FullCardType, CartCard, OrderData, UserData, CommentData } from "../Types" 

// cardsReducer

type SetCardsLength = {
    type: 'SET_CARDS_LENGTH' 
    length: number
}

type SetCards = {
    type: 'SET_CARDS' 
    cards: Array<CardType> 
}

type SetAddNewCardFetching = {
    type: 'SET_ADD_NEW_CARD_FETCHING' 
    isFetching: boolean 
}

type SetExtraCards = {
    type: 'SET_EXTRA_CARDS' 
    cards: Array<CardType> 
}

type SetGetAllCardsFetching = {
    type: 'SET_GET_ALL_CARDS_FETCHING' 
    isFetching: boolean 
}

type SetAllBrands = {
    type: 'SET_ALL_BRANDS' 
    brands: Array<string> 
}

type SetFilter = {
    type: 'SET_FILTER' 
    filter: string 
}

type UpdateCardCommentCount = {
    type: 'UPDATE_CARD_COMMENT_COUNT' 
    cardId: string 
    number: number 
}

export type CardsActions = SetCardsLength | SetCards | SetAddNewCardFetching | SetExtraCards | SetGetAllCardsFetching | SetAllBrands | SetFilter | UpdateCardCommentCount 

// fullCardReducer

type SetCard = {
    type: 'SET_CARD' 
    card: FullCardType 
}

type SetGetCardFetching = {
    type: 'SET_GET_CARD_FETCHING' 
    isFetching: boolean 
}

type SendComment = {
    type: 'SEND_COMMENT' 
    comment: CommentData 
}

type SendCommentFetching = {
    type: 'SEND_COMMENT_FETCHING' 
    isFetching: boolean 
}

type DeleteComment = {
    type: 'DELETE_COMMENT' 
    commentId: string 
}

export type FullCardActions = SetCard | SetGetCardFetching | SendComment | SendCommentFetching | DeleteComment 

// cartReducer

type SetCartCards = {
    type: 'SET_CART_CARDS' 
    cards: Array<CartCard> 
}

type DeleteCartCard = {
    type: 'DELETE_CARD' 
    cardId: string 
}

type AddToCart = {
    type: 'ADD_TO_CART' 
    card: CartCard
}

type SetAddCartCardFetching = {
    type: 'SET_CART_CARD_FETCHING' 
    cardId: string 
    isFetching: boolean 
}

type IncreaseCount = {
    type: 'INCREASE_COUNT' 
    cardId: string 
}

type DecreaseCount = {
    type: 'DECREASE_COUNT' 
    cardId: string 
}

type SetTotalPrice = {
    type: 'SET_TOTAL_PRICE' 
    price: number
}

type DeleteCard = {
    type: 'DELETE_CARD' 
    cardId: string
}

export type CartActions = AddToCart | SetAddCartCardFetching | IncreaseCount | DecreaseCount | DeleteCard | SetTotalPrice | SetCartCards | DeleteCartCard

// ordersReducer

type SetOrders = {
    type: 'SET_ORDERS' 
    orders: Array<OrderData> 
}

type SetMakeOrderSuccess = {
    type: 'SET_MAKE_ORDER_SUCCESS' 
    isSuccess: boolean 
}

type DeleteOrder = {
    type: 'DELETE_ORDER' 
    orderId: string 
}

export type OrdersActions = SetOrders | DeleteOrder | SetMakeOrderSuccess 

// authReducer

type SetUserData = {
    type: 'SET_USER_DATA' 
    userData: UserData | null 
}

type LoginErrorType = {
    type: 'LOGIN_ERROR' 
    error: string | null 
}

type SignupErrorType = {
    type: 'SIGNUP_ERROR' 
    error: string | null 
}

export type AuthorizationSuccessType = {
    type: 'AUTHORIZATION_SUCCESS' 
    isAuth: boolean 
}

type formIsFetching = {
    type: 'FORM_IS_FETCHING' 
    isFetching: boolean 
}

export type AuthActions = LoginErrorType | SignupErrorType | AuthorizationSuccessType | formIsFetching | SetUserData 

export type AppActions = CardsActions | FullCardActions | CartActions | OrdersActions | AuthActions 