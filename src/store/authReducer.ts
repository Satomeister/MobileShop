import { AuthActions, AppActions } from "./actionsTypes"
import { Dispatch} from "redux"
import { usersApi } from "../api/api"
import { UserData } from "../Types"
import { setCartCards } from "./cartReducer"

const initialState = {
    userData: null as null | UserData,
    loginError: null as null | string,
    signupError: null as null | string,
    isAuth: false as boolean,
    formIsFetching: false as boolean
}

type initialStateType = typeof initialState

export const authReducer = (state = initialState, action: AuthActions):    initialStateType => {
    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
                userData: action.userData
            }
        case "FORM_IS_FETCHING":
            return {
                ...state,
                formIsFetching: action.isFetching
            }
        case "AUTHORIZATION_SUCCESS":
            return {
                ...state,
                loginError: null,
                signupError: null,
                isAuth: action.isAuth
            }
        case "LOGIN_ERROR":
            return {
                ...state,
                loginError: action.error,
                isAuth: false
            }
        case "SIGNUP_ERROR":
            return {
                ...state,
                signupError: action.error,
                isAuth: false
            }
        default:
            return state
    }
}

const setUserData = (userData:UserData | null): AuthActions => ({type: "SET_USER_DATA", userData})
const formIsFetching = (isFetching: boolean): AuthActions => ({type: "FORM_IS_FETCHING", isFetching})
export const authorizationsSuccess = (isAuth:boolean): AuthActions => ({type: "AUTHORIZATION_SUCCESS", isAuth})
const loginError = (error: string | null): AuthActions => ({type: "LOGIN_ERROR", error})
const signupError = (error: string | null): AuthActions => ({type: "SIGNUP_ERROR", error})

export const signup = (firstName: string, lastName: string, email: string, password: string, confirmPassword: string) => async (dispatch: Dispatch<AppActions>) => {
    dispatch(formIsFetching(true))
    dispatch(signupError(null))
    try {
        const res = await usersApi.signup(firstName, lastName, email, password, confirmPassword)
        if (res.status === 200) {
            const user = {
                firstName: res.data.userData.firstName,
                lastName: res.data.userData.lastName
            }
            dispatch(setUserData(user))
            localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
            dispatch(authorizationsSuccess(true))
        }
        dispatch(formIsFetching(false))
    } catch (err) {
        if (err.response.status === 400) {
            dispatch(signupError(err.response.data.error))
        }
        if (err.response.status === 500) {
            dispatch(signupError('Something went wrong, please try again later'))
        }
        dispatch(formIsFetching(false))
    }
}

export const login = (email: string, password: string) => async (dispatch: Dispatch<AppActions>) => {
    dispatch(formIsFetching(true))
    dispatch(loginError(null))
    try {
        const res = await usersApi.login(email, password)
        if (res.status === 200) {
            const user = {
                firstName: res.data.userData.firstName,
                lastName: res.data.userData.lastName
            }
            dispatch(setUserData(user))
            localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
            dispatch(authorizationsSuccess(true))
        }
        dispatch(formIsFetching(false))
    } catch (err) {
        if (err.response.status === 400) {
            dispatch(loginError(err.response.data.error))
        }
        if (err.response.status === 500) {
            dispatch(loginError('Something went wrong, please try again later'))
        }
        dispatch(formIsFetching(false))
    }
}

export const getUserData = (token: string) => async (dispatch: Dispatch<AppActions>) => {
    const res = await usersApi.getUserData(token)
    if(res.status === 200){
        const user = {
            firstName: res.data.firstName,
            lastName: res.data.lastName
        }
        dispatch(setUserData(user))
    }
}

export const logout = () => async (dispatch: Dispatch<AppActions>) => {
    dispatch(formIsFetching(true))
    const res = await usersApi.logout()
    if (res.status === 200) {
        localStorage.removeItem('FBIdToken')
        dispatch(setCartCards([]))
        dispatch(setUserData(null))
        dispatch(authorizationsSuccess(false))
        dispatch(formIsFetching(false))
    }
}