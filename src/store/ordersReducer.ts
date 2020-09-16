import { OrderCardData, OrderData } from "../Types" 
import { AppActions, OrdersActions } from "./actionsTypes" 
import { Dispatch } from "redux" 
import { ordersApi } from "../api/api" 

const initialState = {
    orders: [] as [] | Array<OrderData>,
    makeOrderSuccess: false
}

type InitialStateType = typeof initialState 

export const ordersReducer = (state = initialState, action: OrdersActions):InitialStateType => {
    switch (action.type) {
        case "SET_ORDERS":
            return {
                ...state,
                orders: action.orders
            }
        case "DELETE_ORDER":
            return {
                ...state,
                orders: state.orders.filter(order => order.orderId !== action.orderId)
            }
        case "SET_MAKE_ORDER_SUCCESS":
            return {
                ...state,
                makeOrderSuccess: action.isSuccess
            }
        default:
            return state
    }
}

const setOrders = (orders: Array<OrderData>):OrdersActions => ({type: "SET_ORDERS", orders})
const removeOrder = (orderId: string):OrdersActions => ({type:"DELETE_ORDER", orderId})
const setMakeOrderSuccess = (isSuccess: boolean):OrdersActions => ({type:"SET_MAKE_ORDER_SUCCESS", isSuccess})

export const getAllOrders = () => async (dispatch: Dispatch<AppActions>) => {
    const res = await ordersApi.getAllOrders()
    if(res.status === 200){
        dispatch(setOrders(res.data)) 
    }
}

export const makeOrder = (firstName:string,lastName:string,phoneNumber:string,cardsDataArr:Array<OrderCardData>,totalPrice:number) => async (dispatch: Dispatch<AppActions>) => {
    const res = await ordersApi.makeOrder(firstName,lastName,phoneNumber,cardsDataArr,totalPrice)
    if(res.status === 200){
        dispatch(setOrders([]))
        dispatch(setMakeOrderSuccess(true))
        setTimeout(() => {
            dispatch(setMakeOrderSuccess(false))
            window.location.href = '/'
        }, 5000)
    }
}

export const deleteOrder = (orderId:string) => async (dispatch: Dispatch<AppActions>) => {
    const res = await ordersApi.deleteOrder(orderId)
    if(res.status === 200){
        dispatch(removeOrder(orderId))
    }
}


