import React, {FC} from "react" 
import { Redirect } from "react-router-dom" 
import { connect } from "react-redux" 
import { AppState } from "../store/rootStore" 

export const withAuthRedirect = (Component: FC,toRedirect: string) => {

    const RedirectComponent:FC<PropsType> = ({isAuth,children}:{isAuth:boolean, children:any}) => {
        if(isAuth) return <Redirect to={toRedirect}/>
        return <Component {...isAuth} {...children}/>
    }

    type StateProps = {
        isAuth: boolean
    }

    type OwnProps = {
        children: any
    }

    type PropsType = StateProps & OwnProps

    const mapStateToProps = (state:AppState):StateProps => ({
        isAuth: state.auth.isAuth
    })

    return connect<StateProps, any, any, AppState>(mapStateToProps)(RedirectComponent)
}