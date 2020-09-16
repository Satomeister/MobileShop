import React, { useState, FC, useEffect } from "react"
import classes from './Admin.module.scss' 
import btn from '../../cssModules/cssButtons.module.scss'
import { connect } from "react-redux" 
import { OrderData, UserData } from "../../Types" 
import useInput from "../../hooks/useInput"
import { AppState } from "../../store/rootStore" 
import { getAllOrders } from "../../store/ordersReducer" 
import { AddNewCard } from "../../store/cardsReducer" 
import Order from "../../components/Order/Order" 
import CredErrorBlock from "../../components/common/CredErrorBlock/CredErrorBlock" 

const Admin:FC<AllProps> = ({orders,userData,getAllOrders,AddNewCard,addNewCardFetching}) => {
    const brand = useInput('')
    const title = useInput('')
    const about = useInput('')
    const price = useInput('')
    const[files,setFiles] = useState<Array<HTMLInputElement>>()
    const[fileError,setFileError] = useState('')

    useEffect(() => {
        getAllOrders()
    }, [])

    const onFileChange = (e:any) => {
        setFileError('')
        const files = e.target.files
        setFiles(files)
    }

    const submitHandler = async (e:any) => {
        e.preventDefault()
        if(userData && `${userData!.firstName}_${userData!.lastName}` === 'Taras_Klimarchuk'){
            if(files && files.length > 2){
                AddNewCard(brand.value,title.value,about.value,+price.value,files)
            } else {
                setFileError('Photo quantity must be more than 2')
            }
        } else {
            setFileError('Only for admin')
        }
    }

    return (
        <div className={classes.admin}>
            <form className={classes.form} onSubmit={submitHandler}>
                <h2>Create card here</h2>
                <CredErrorBlock errorMessage={fileError}/>
                <div>
                    <label htmlFor="brand">Brand: </label>
                    <input className={classes.input} {...brand.bind} id="brand" required/>
                </div>
                <div>
                    <label htmlFor="title">Title: </label>
                    <textarea className={classes.textarea} {...title.bind} id="title" required/>
                </div>
                <div>
                    <label htmlFor="about">About: </label>
                    <textarea className={classes.textarea} {...about.bind} id="about" required/>
                </div>
                <div>
                    <label htmlFor="price">Price: </label>
                    <input className={classes.input} {...price.bind} id="price" type="number" required/>
                </div>
                <div>
                    <label htmlFor="photo">Photo: </label>
                    <input multiple required id="photo" type="file" onChange={onFileChange}/>
                </div>
                <button disabled={addNewCardFetching} className={btn.btnGrey} type='submit'>Add new card</button>
            </form>
            <table className={classes.orders}>
                <thead>
                <tr>
                    <th>first name</th>
                    <th>last name</th>
                    <th>phone number</th>
                    <th>cards</th>
                    <th>total cost</th>
                    <th>date</th>
                    <th>done</th>
                </tr>
                </thead>
            <tbody>
            {
                orders.map(order => {
                    return (
                        <Order order={order} key={order.orderId} />
                    )
                })
            }
            </tbody>
            </table>
        </div>
    ) 
}

type StateProps = {
    orders: Array<OrderData> 
    addNewCardFetching: boolean 
    userData: UserData | null 
}

type DispatchProps = {
    getAllOrders: () => void 
    AddNewCard: (brand: string, title: string, about: string, price: number, files: Array<HTMLInputElement>) => void 

}

type OwnProps = {}

type AllProps = StateProps & DispatchProps & OwnProps

const mapStateToProps = (state: AppState): StateProps => ({
    orders: state.orders.orders,
    addNewCardFetching: state.cards.addNewCardFetching,
    userData: state.auth.userData
})

export default connect<StateProps, DispatchProps, OwnProps, AppState>(mapStateToProps, { getAllOrders,AddNewCard })(Admin) 