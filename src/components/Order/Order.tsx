import React, { FC } from "react" 
import { connect } from "react-redux" 
import { OrderData } from "../../Types" 
import { AppState } from "../../store/rootStore" 
import { deleteOrder } from "../../store/ordersReducer" 
import moment from "moment" 

const Order:FC<AllProps> = ({order,deleteOrder}) => {

    const onDelete = () => {
        deleteOrder(order.orderId)
    }

    return (
        <tr>
            <td>{order.firstName}</td>
            <td>{order.lastName}</td>
            <td>{order.phoneNumber}</td>
            <td>
                {
                    order.cardsDataArr.map(card => {
                        return (
                            <div key={card.cardId}>
                                <div>
                                    <b>id: </b>
                                    <span>{card.cardId}</span>
                                </div>
                                <div>
                                    <b>count: </b>
                                    <span>{card.count}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </td>
            <td>{order.totalPrice}</td>
            <td>{moment(order.createdAt).calendar()}</td>
            <td><button onClick={onDelete}>delete</button></td>
        </tr>
    )
}

type OwnProps = {
    order: OrderData
}

type StateProps = {}

type DispatchProps = {
    deleteOrder: (orderId: string) => void
}

type AllProps = StateProps & DispatchProps & OwnProps

export default connect<StateProps, DispatchProps, OwnProps, AppState>(null, { deleteOrder })(Order) 