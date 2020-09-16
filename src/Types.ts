export type CardType = {
    cardId: string
    brand: string
    title: string
    commentCount: number
    price: number
    photoURL: string
    createdAt: string
}

export type FullCardType = {
    cardId: string
    brand: string
    title: string
    price: number
    photoURL: Array<string>
    about: string
    comments: Array<CommentData>
    createdAt: string
}

export type BrandType = Array<string>

export type CartCard = {
    cartCardId?: string
    cardId: string
    photoURL: string
    title: string
    price: number
    count: number
}

export type OrderCardData = {
    cardId: string
    count: number
}

export type OrderData = {
    orderId: string
    firstName: string
    lastName: string
    phoneNumber: string
    cardsDataArr: Array<OrderCardData>
    totalPrice: number
    createdAt: string
}

export type CommentData = {
    commentId: string
    body: string
    firstName: string
    lastName: string
    createdAt: string
}

export type UserData = {
    firstName: string
    lastName: string
}