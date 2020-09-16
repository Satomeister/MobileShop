import axios from "axios" 
import {BrandType, CardType, CartCard, CommentData, FullCardType, OrderCardData, OrderData, UserData} from "../Types" 

axios.defaults.baseURL = 'https://us-central1-phone-shop-aaaa7.cloudfunctions.net/api'

type GetCardsLength = {
    length: number
}

export const cardsApi = {
    getCardsLength(brand: string) {
        return axios.get<GetCardsLength>(`/cards/size/${brand}`)
    },
    getAllCards() {
        return axios.get<Array<CardType>>('/cards')
    },
    addNewCard(brand: string, title: string, about: string, price: number, photoURL: Array<string>) {
        return axios.post('/card', {brand,title,about,price,photoURL})
    },
    uploadExtraCards(size: number, brand: string) {
        return axios.get<Array<CardType>>(`/card/${size}/${brand}`)
    },
    getAllBrands() {
        return axios.get<BrandType>(`/brands/`)
    },
    getCardsByBrand(brand: string) {
        return axios.get<Array<CardType>>(`/brand/${brand}`)
    },
    getCardById(cardId: string) {
        return axios.get<FullCardType>(`/card/${cardId}`)
    },
}

export const ordersApi = {
    getAllOrders() {
        return axios.get<Array<OrderData>>('/orders')
    },
    makeOrder(firstName: string, lastName: string, phoneNumber: string, cardsDataArr: Array<OrderCardData>, totalPrice: number) {
        return axios.post<OrderData>('/order', {firstName, lastName, phoneNumber, cardsDataArr, totalPrice})
    },
    deleteOrder(orderId: string) {
        return axios.delete(`/order/${orderId}`)
    }
}

export const commentsApi = {
    makeComment(cardId: string, body: string, firstName: string, lastName: string) {
        return axios.post<CommentData>('/comment', {firstName, lastName, cardId, body})
    },
    deleteComment(commentId: string,cardId: string) {
        return axios.delete(`/comment/${commentId}/${cardId}`)
    }
}

type AddCartCard = {
    cartCardId: string 
    cardId: string 
    photoURL: string 
    title: string 
    price: number 
    count: number 
}

export const cartApi = {
    getAllCartCards(firstName: string, lastName:string) {
        const handle = `${firstName}_${lastName}`
        return axios.get<Array<CartCard>>(`/cart/${handle}`)
    },
    addCartCard(cardId:string, firstName: string, lastName:string, photoURL: string, title: string, price: number,count:number) {
        return axios.post<AddCartCard>('/cart', {cardId,firstName,lastName, photoURL, title, price, count})
    },
    deleteCartCard(cartCardId: string, cardId: string) {
        return axios.delete(`/cart/${cartCardId}/${cardId}`)
    },
    increaseCount(cartCardId: string) {
        return axios.get(`/inc/${cartCardId}`)
    },
    decreaseCount(cartCardId: string) {
        return axios.get(`/dec/${cartCardId}`)
    },
}

type AuthResponseTypeSuccess = {
    token: string 
    userData: UserData 

}

type LogoutTypeSuccess = {
    message: string 
}

type AuthResponseTypeError = {
    error: string 
}

export const usersApi = {
    login(email: string, password: string) {
        return axios.post<AuthResponseTypeSuccess & AuthResponseTypeError>('/login', {email, password})
    },
    signup(firstName: string, lastName: string, email: string, password: string, confirmPassword: string) {
        return axios.post<AuthResponseTypeSuccess & AuthResponseTypeError>('/signup', {
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        })
    },
    getUserData(token: string) {
        return axios.get(`/user/${token}`)
    },
    logout() {
        return axios.get<LogoutTypeSuccess & AuthResponseTypeError>('/logout')
    }
}