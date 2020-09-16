import React, { FC, useEffect, useState } from "react" 
import { Link, NavLink } from "react-router-dom" 
import classes from "./Filter.module.scss" 

const BrandFilter:FC<OwnProps> = ({filteredBrands}) => {
    const[brandsFilter,setBrandsFilter] = useState(false)

    useEffect(() => {
        document.documentElement.addEventListener('click', () => {setBrandsFilter(false)})
        return () => {
            document.documentElement.removeEventListener('click', () => {setBrandsFilter(false)})
        }
    },[])

    return (
        <>
        {
            document.documentElement.clientWidth > 750 ? <div className={classes.brands}>
                    <h2 className={classes.brandText}>Brand</h2>
                    <ul className={classes.brandList}>
                        <NavLink exact className={classes.brand} activeClassName={classes.selected} to='/'>All</NavLink>
                        {
                            filteredBrands!.map(brand => {
                                return <NavLink key={brand} className={classes.brand} activeClassName={classes.selected}
                                                to={`/brand/${brand}`}>{brand}</NavLink>
                            })
                        }
                    </ul>
                </div>
                : <div className={classes.brandsFilter}>
                    <span className={classes.brandsOpen} onClick={() => {setBrandsFilter(true)}}>Brands</span>
                    {
                        brandsFilter && <ul className={classes.brandsContainer}>
                            <Link className={`${classes.brand} ${classes.brandItem}`} to='/'>All</Link>
                            {
                                filteredBrands?.map(brand => {
                                    return <Link key={brand} className={`${classes.brand} ${classes.brandItem}`}
                                                 to={`/brand/${brand}`}>{brand}</Link>
                                })
                            }
                        </ul>
                    }
                </div>
        }
        </>
    )
}

type OwnProps = {
    filteredBrands: Array<string> 
}

export default BrandFilter 