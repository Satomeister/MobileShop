import React, { FC } from "react" 
import classes from './Header.module.scss' 
import btn from '../../cssModules/cssButtons.module.scss' 
import { connect } from "react-redux" 
import { Link } from "react-router-dom" 
import { AppState } from "../../store/rootStore" 
import { CartCard, UserData } from "../../Types" 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" 
import { faShoppingCart,faMobileAlt } from "@fortawesome/free-solid-svg-icons" 
import { logout } from '../../store/authReducer'

const Header:FC<AllProps> = ({cards,userData,logout}) => {

    const cardsCount = cards.length 

    return (
        <div className={classes.header}>
            <div className={classes.headerContent}>
                <Link to='/' className={classes.logo}>
                    <FontAwesomeIcon  icon={faMobileAlt} size="2x"  color='#222'/>
                    <span>MOBILE SHOP</span>
                </Link>
                <div>
                    {
                        userData ? <div className={classes.user}>
                                <button className={classes.logout} onClick={() => {logout()}}>Logout</button>
                                <div className={classes.initials}>{`${userData.firstName[0].toUpperCase()}${userData.lastName[0].toUpperCase()}`}</div>
                                <span>{userData.firstName} </span>
                                <span>{userData.lastName}</span>
                            </div>
                            : <div className={classes.actions}>
                                <Link className={btn.btnBlue} to='/login'>Login</Link>
                                <Link className={`${btn.btnBlue} ${classes.signup}`} to='/signup'>Sign Up</Link>
                            </div>
                    }
                </div>
                <Link className={classes.cart} to='/cart'>
                    { cardsCount > 0 && <div className={classes.itemsCount}>{cardsCount}</div>}
                    <FontAwesomeIcon  icon={faShoppingCart} size="2x"  color='rgb(48,111,180)'/>
                </Link>
                <Link className={classes.admin} to='/admin'>
                    Admin
                </Link>
            </div>
        </div>
    )
}

type StateProps = {
    cards: Array<CartCard> 
    userData: UserData | null 
}

type DispatchProps = {
    logout: () => void 
}

type OwnProps = {}

type AllProps = StateProps & DispatchProps & OwnProps

const mapStateToProps = (state:AppState):StateProps=> ({
    cards: state.cart.cards,
    userData: state.auth.userData
})

export default connect<StateProps, DispatchProps, OwnProps, AppState>(mapStateToProps, { logout })(Header) 