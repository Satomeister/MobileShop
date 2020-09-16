import React, { FC, useEffect } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import axios from "axios"
import jwtDecode from "jwt-decode"
import { AppState } from "./store/rootStore"
import Shop from "./pages/Shop/Shop"
import Cart from './pages/Cart/Cart'
import Admin from './pages/Admin/Admin'
import CardInfo from "./pages/FullCard/FullCard"
import Order from './pages/OrderPage/OrderPage'
import Signup from "./pages/auth/Signup"
import Login from "./pages/auth/Login"
import { authorizationsSuccess,getUserData } from "./store/authReducer"
import { getCartCards } from "./store/cartReducer"
import { UserData } from './Types'

const App:FC<PropsTypes> = ({userData,getCartCards,authorizationsSuccess, getUserData}) => {
    useEffect(() => {
        const token = localStorage.FBIdToken
        if(token){
            const decodedToken:any = jwtDecode(token)
            if(decodedToken.exp * 1000 < Date.now()){
                localStorage.removeItem('FBIdToken')
                authorizationsSuccess(false)
            } else {
                getUserData(token.split('Bearer ')[1])
                axios.defaults.headers.common['Authorization'] = token
                authorizationsSuccess(true)
            }
        }
    },[])

    useEffect(() => {
        if(userData){
            getCartCards()
        }
    },[userData])

    return (
        <div className='App'>
            <Switch>
                <Route exact path='/'>
                    <Shop />
                </Route>
                <Route exact path='/brand/:brand'>
                    <Shop />
                </Route>
                <Route exact path='/card/:cardId'>
                    <CardInfo />
                </Route>
                <Route exact path='/cart'>
                    <Cart />
                </Route>
                <Route exact path='/admin'>
                    <Admin />
                </Route>
                <Route exact path='/order'>
                    <Order />
                </Route>
                <Route exact path='/login'>
                    <Login />
                </Route>
                <Route exact path='/signup'>
                    <Signup />
                </Route>
            </Switch>
        </div>
    )
}

type StateProps = {
    userData: UserData | null
}

type DispatchProps = {
    authorizationsSuccess: (isAuth: boolean) => any
    getUserData: (token: string) => void
    getCartCards: () => void
}

type OwnProps = {}

const mapStateToProps = (state:AppState):StateProps => ({
    userData: state.auth.userData
})

type PropsTypes = StateProps & DispatchProps & OwnProps

export default connect<StateProps, DispatchProps, OwnProps, AppState>(mapStateToProps, { authorizationsSuccess,getUserData,getCartCards })(App)