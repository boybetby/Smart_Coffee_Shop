import React, { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { ShoppingContext } from '../ShoppingContext/ShoopingContext'
import Information from './InformationForm/index';
import Cart from './Cart/index';
import CouponsList from '../CouponsList';
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
    }, [])

    return (
        <div className="checkout-main">
                <div className="grid-item left">
                    <Information/>
                </div>
                <div className="right">
                    <div className="right_cart">
                        <Cart/>
                    </div>          
                    <div className="right_coupon">
                        <CouponsList />
                    </div>          
                </div>
        </div>
    )
}

export default CheckoutForm