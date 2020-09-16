import React, { FC } from "react" 
import classes from './auth.module.css'
import { Link } from "react-router-dom" 
import { connect } from "react-redux" 
import { AppState } from "../../store/rootStore" 
import { withAuthRedirect } from "../../hoc/withAuthRedirect" 
import FormContainer from "./FormContainer" 
import CredErrorBlock from "../../components/common/CredErrorBlock/CredErrorBlock" 
import { signup } from "../../store/authReducer" 
import useInput from "../../hooks/useInput" 

const Signup: FC<PropsTypes> = ({signup,signupError,formIsFetching}) => {

    const firstName = useInput('')
    const lastName = useInput('')
    const email = useInput('')
    const password = useInput('')
    const confirmPassword = useInput('')

    const onSubmitHandle = (e:any) => {
        e.preventDefault()
        signup(firstName.value,lastName.value,email.value,password.value,confirmPassword.value)
    }

    return (
        <FormContainer>
            <h2 className={classes.title}>Create an account</h2>
            <form onSubmit={onSubmitHandle} className={classes.form}>
                <CredErrorBlock errorMessage={signupError}/>
                <div className={classes.inputBox}>
                    <input {...firstName.bind} className={classes.input} id="firstName" required />
                    <label className={classes.label} htmlFor="firstName">First Name</label>
                </div>
                <div className={classes.inputBox}>
                    <input {...lastName.bind} className={classes.input} id="lastName" required />
                    <label className={classes.label} htmlFor="lastName">Last Name</label>
                </div>
                <div className={classes.inputBox}>
                    <input {...email.bind} className={classes.input} id="email" required />
                    <label className={classes.label} htmlFor="email">Email</label>
                </div>
                <div className={classes.inputBox}>
                    <input {...password.bind} className={classes.input} id="password" type="password" required />
                    <label className={classes.label} htmlFor="password">Password</label>
                </div>
                <div className={classes.inputBox}>
                    <input {...confirmPassword.bind} className={classes.input} id="confirmPassword" type="password" required />
                    <label className={classes.label} htmlFor="confirmPassword">Confirm Password</label>
                </div>
                <button disabled={formIsFetching} className={classes.button} type="submit">Sign up</button>
            </form>
            <div className={classes.link}>
                <small>Already have an account? login <Link to={'/login'}>here</Link></small>
            </div>
        </FormContainer>
    )
}

type OwnProps = {}

type StateProps = {
    signupError: string | null
    formIsFetching: boolean
}

type DispatchProps = {
    signup: (firstName:string,lastName:string,email:string,password:string,confirmPassword:string) => void
}

type PropsTypes = StateProps & DispatchProps & OwnProps

const mapStateToProps = (state:AppState):StateProps => ({
    formIsFetching: state.auth.formIsFetching,
    signupError: state.auth.signupError
})

export default withAuthRedirect(connect<StateProps, DispatchProps, OwnProps, AppState>(mapStateToProps,{ signup })(Signup), '/')