import React, { useContext, useState } from 'react'
import { ShoppingContext } from '../../ShoppingContext/ShoopingContext'


const Cart = () => {
    const { cartProducts, orderType, setOrderType } = useContext(ShoppingContext)

    const handleOrderType = (event) => {
        setOrderType(event.target.value);
    }

    const calculateTotal = () => {
        let total = 0;
        if(cartProducts.length !== 0){
            const result = cartProducts.map(product => product.defaultPrice[0] * product.quantity).reduce((a, b) => a + b)
            total = result;
        }
        return total
    }

    return (
        <div>
            <div style={{textAlign: "center"}}><h3>YOUR ORDER</h3></div>
            <div className='productcart-wrapper'>
                    {cartProducts.map(product => (
                    <div className='cart-info' key={product._id}>
                            <>
                                <div className='cart-product'>
                                    <p>{product.drinkName}</p>
                                </div>
                                <div className='cart-amount'>
                                    <p>{product.quantity}</p>
                                </div>      
                            </>
                    </div>
                    ))}
                <div className='cart-info'>
                    <div className='cart-product'>
                        <p><b>TOTAL:</b></p>
                    </div>
                    <div className='cart-amount'>
                        <p><b>{calculateTotal()} VND</b></p>
                    </div>    
                </div>
                <div className="radio">
                    <label className='btn_radio'>
                        <input
                            type="radio"
                            value="DELIVERY"
                            checked={orderType === "DELIVERY"}
                            onChange={handleOrderType}
                        />
                        DELIVERY
                    </label>
                </div>
                <div className="radio">
                    <label className='btn_radio'>
                        <input
                            type="radio"
                            value="PICK-UP"
                            checked={orderType === "PICK-UP"}
                            onChange={handleOrderType}
                        />
                        PICK-UP
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Cart