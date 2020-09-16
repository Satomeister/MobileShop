import React, { FC, useEffect } from "react" 
import classes from './Filter.module.scss'
import { connect } from "react-redux"
import { BrandType } from "../../Types"
import { AppState } from "../../store/rootStore"
import { getAllBrands,setFilter } from "../../store/cardsReducer"
import BrandFilter from "./BrandsFilter"

const Filter: FC<AllProps> = ({brands,getAllBrands,setFilter}) => {

    useEffect(() => {
        getAllBrands()
    },[])

    const onChange = (e:any) => {
        setFilter(e.target.value)
    }

    let filteredBrands = Array.from(new Set(brands))
    return (
        <div className={classes.filter}>
            <div className={classes.localFilter}>
                <select onChange={onChange} className={classes.select}>
                    <option defaultValue="comments" value="comments">By rating</option>
                    <option value="cheap">From cheap to expensive</option>
                    <option value="expensive">From expensive to cheap</option>
                </select>
            </div>
            <BrandFilter filteredBrands={filteredBrands} />
        </div>
    )
}

type OwnProps = {

}

type StateProps = {
    brands: BrandType | null
}

type DispatchProps = {
    getAllBrands: () => void
    setFilter: (filter:string) => void
}

type AllProps = StateProps & DispatchProps & OwnProps

const mapStateToProps = (state:AppState):StateProps => ({
    brands: state.cards.brands
})

export default connect<StateProps,DispatchProps,OwnProps,AppState>(mapStateToProps, { getAllBrands,setFilter })(Filter)