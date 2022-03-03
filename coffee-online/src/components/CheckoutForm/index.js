import React, { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { ShoppingContext } from '../ShoppingContext/ShoopingContext'
import Information from './InformationForm/index';
import Cart from './Cart/index';
import './style.css'

const CheckoutForm = () => {
    const { cartProducts } = useContext(ShoppingContext)

    let navigate = useNavigate();

    const protectRouter = () => {
        if(cartProducts.length === 0){
            navigate(`/`)
        }
    }

    useEffect(() => {
        protectRouter()
    })

    return (
        <div className="checkout-main">
                <div className="grid-item left">
                    <Information/>
                </div>
                <div className="grid-item right">
                    <Cart/>
                </div>     
        </div>
    )
}

export default CheckoutForm