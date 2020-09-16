import React, { FC, useEffect } from "react" 
import classes from './auth.module.css'
import { Link } from "react-router-dom" 
import { connect } from "react-redux" 
import { AppState } from "../../store/rootStore" 
import { withAuthRedirect } from "../../hoc/withAuthRedirect" 
import useInput from "../../hooks/useInput" 
import FormContainer from "./FormContainer" 
import CredErrorBlock from "../../components/common/CredErrorBlock/CredErrorBlock" 
import { login } from "../../store/authReducer" 

const Login: FC<PropsTypes> = ({login,loginError,formIsFetching}) => {
    const email = useInput('')
    const password = useInput('')

    useEffect(() => {
        email.clear()
        password.clear()
    },[loginError])

    const onSubmitHandle = (e:any) => {
        e.preventDefault()
        login(email.value,password.value)
    }

    return (
        <FormContainer>
            <h2 className={classes.title}>Login as Existing user</h2>
            <form onSubmit={onSubmitHandle} className={classes.form}>
                <CredErrorBlock errorMessage={loginError}/>
                <div className={classes.inputBox}>
                    <input {...email.bind} className={classes.input} id="email" required />
                    <label className={classes.label} htmlFor="email">Email</label>
                </div>
                <div className={classes.inputBox}>
                    <input {...password.bind} className={classes.input} type="password" id="password" required />
                    <label className={classes.label} htmlFor="password">Password</label>
                </div>
                <button disabled={formIsFetching} className={classes.button} type="submit" >LOGIN</button>
            </form>
            <div className={classes.link}>
                <small>Do not have an account? sign up <Link to={'/signup'}>here</Link></small>
            </div>
        </FormContainer>
    )
}

type StateProps = {
    formIsFetching: boolean,
    loginError: null | string
}

type DispatchProps = {
    login:(email: string, password: string) => void
}

type OwnProps = {}

type PropsTypes = StateProps & DispatchProps & OwnProps

const mapStateToProps = (state:AppState):StateProps => ({
    formIsFetching: state.auth.formIsFetching,
    loginError: state.auth.loginError
})

export default withAuthRedirect(connect<StateProps, DispatchProps, OwnProps, AppState>(mapStateToProps, { login })(Login), '/')