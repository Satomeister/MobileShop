import React, {FC, useEffect, useMemo, useRef} from "react" 
import classes from './Goods.module.scss'
import btn from '../../cssModules/cssButtons.module.scss'
import { uploadExtraCards } from "../../store/cardsReducer" 
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons" 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" 
import { connect } from "react-redux" 
import Card from "../Card/Card" 
import { AppState } from "../../store/rootStore" 
import { CardType } from "../../Types" 
import Preloader from "../common/Preloader/Preloader" 

const Goods: FC<AllProps> = ({cards,getAllCardsFetching,uploadExtraCards,cardsLength,brand,filter}) => {
    const count = useRef(9)

    useEffect(() => {
        count.current = 9
    },[brand])

    const getExtraCards = () => {
        if(brand){
            uploadExtraCards(count.current, brand)
            count.current = count.current + 6 
        } else {
            uploadExtraCards(count.current, 'All')
            count.current = count.current + 6 
        }
    }

    useMemo(() => {
        if(filter === 'cheap'){
            cards!.sort((a, b) => +a.price > +b.price ? 1 : -1) 
        } else if (filter === 'expensive'){
            cards!.sort((a, b) => +a.price < +b.price ? 1 : -1) 
        } else if (filter === 'comments'){
            cards!.sort((a, b) => +a.commentCount < +b.commentCount ? 1 : -1) 
        }
    },[filter,cards])

    return (
        <div className={classes.goodsContainer}>
            {
                !getAllCardsFetching ?
                    <>
                        <ul className={classes.goods}>
                            {
                                cards.map(card => {
                                    return <Card {...card} key={card.cardId}/>
                                })
                            }
                        </ul>
                        {
                            cardsLength && count.current < cardsLength && <button className={btn.btnGreen} onClick={getExtraCards}>
                            <FontAwesomeIcon  icon={faRedoAlt} size="lg"  color='#ffffff'/>
                            <span>Show More</span>
                        </button>
                        }
                    </>
                    :   <Preloader />
            }
        </div>
    )
}

type StateProps = {
    cardsLength: number | null 
    getAllCardsFetching: boolean 
    filter: string | null 
}

type DispatchProps = {
    uploadExtraCards: (size:number, brand: string) => void 
}

type OwnProps = {
    cards: Array<CardType> 
    brand: string
}

type AllProps = StateProps & DispatchProps & OwnProps

const mapStateToProps = (state:AppState):StateProps=> ({
    cardsLength: state.cards.cardsLength,
    getAllCardsFetching: state.cards.getAllCardsFetching,
    filter: state.cards.filter
})

export default connect<StateProps, DispatchProps, OwnProps, AppState>(mapStateToProps,{ uploadExtraCards })(Goods)