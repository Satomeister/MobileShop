import React, { FC, useEffect } from 'react' 
import classes from './Shop.module.scss'
import { connect } from "react-redux" 
import Filter from '../../components/Filter/Filter' 
import Goods from '../../components/Goods/Goods' 
import Header from "../../components/Header/Header" 
import { getCardsLength,getAllCards, getCardsByBrand } from "../../store/cardsReducer" 
import { CardType } from "../../Types" 
import { AppState } from "../../store/rootStore" 
import { useParams } from 'react-router-dom' 

const Shop: FC<AllProps> = ({getCardsLength,getAllCards,getCardsByBrand,cards}) => {

    const params = useParams<{brand: string}>()
    const brand = params.brand

    useEffect(() => {
        if(!brand){
            getAllCards()
            getCardsLength('All')
        } else {
            getCardsByBrand(brand)
            getCardsLength(brand)
        }
    },[brand])

    return (
        <>
            <Header/>
            <div className={classes.shop}>
                <Filter/>
                <Goods cards={cards} brand={brand}/>
            </div>
        </>
    ) 
}

type StateProps = {
    cards: Array<CardType> 
}

type DispatchProps = {
    getCardsLength: (brand:string) => void 
    getAllCards: () => void 
    getCardsByBrand: (brand:string) => void 
}

type OwnProps = {}

type AllProps = StateProps & DispatchProps & OwnProps

const mapStateToProps = (state:AppState):StateProps => ({
    cards: state.cards.cards
})

export default connect<StateProps,DispatchProps,OwnProps,AppState>(mapStateToProps, { getCardsLength,getAllCards,getCardsByBrand })(Shop)