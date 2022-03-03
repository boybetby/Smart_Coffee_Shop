import React, { useContext } from 'react'
import { ShoppingContext } from '../ShoppingContext/ShoopingContext'
import { useNavigate } from "react-router-dom";
import './style.scss'

const Checkout = () => {
    const { cartProducts } = useContext(ShoppingContext)

    let navigate = useNavigate();

    const calculateTotal = () => {
        let total = 0;
        if(cartProducts.length !== 0){
            const result = cartProducts.map(product => product.defaultPrice[0] * product.quantity).reduce((a, b) => a + b)
            total = result;
        }
        return total
    }
    
    const proceedToCheckout = () => {
        if(cartProducts.length === 0){
            alert('You have no product in your cart')
        }
        else {
            navigate(`/checkout`)
        }
    }
        

    return (
        <div className="checkout-container">
            <div className="total">
                <span>Total:</span>
                <span>{calculateTotal()} VND</span>
            </div>
        <button onClick={() => proceedToCheckout()} >CHECKOUT</button>
        </div>
    )
}

export default Checkout
