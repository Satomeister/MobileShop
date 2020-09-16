import { applyMiddleware, combineReducers, createStore } from "redux" 
import thunk from "redux-thunk"
import { cardsReducer } from "./cardsReducer" 
import { fullCardReducer } from "./fullCardReducer" 
import { cartReducer } from "./cartReducer" 
import { ordersReducer } from "./ordersReducer" 
import { authReducer } from "./authReducer" 

export const rootReducer = combineReducers({
    cards: cardsReducer,
    fullCard: fullCardReducer,
    cart: cartReducer,
    orders: ordersReducer,
    auth: authReducer
})

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store 
