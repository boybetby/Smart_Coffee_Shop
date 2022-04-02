import React, { useContext, useState } from 'react'
import { ShoppingContext } from '../../ShoppingContext/ShoopingContext'
import axios from 'axios'
import { apiUrl } from '../../../constants/constants'
import swal from 'sweetalert'
import './style.css'

const Cart = () => {
    const { cartProducts, orderType, setOrderType, coupon, setCoupon, couponId, setCouponId } = useContext(ShoppingContext)
    
    const handleOrderType = (event) => {
        setOrderType(event.target.value);
    }
    
    const handleCouponChange = (event) => {
        setCouponId(event.target.value)
    }

    const handleUseCouponClick = async() => {
        try {
            const response = await axios({
                method: 'post',
                url:  `${apiUrl}/api/coupon/findcoupon`,
                data: {
                    "couponId": couponId
                }
            });
            if(response.data.success) {
                if(response.data.coupon.conditionValue <= calculateTotal() || response.data.coupon.usage === 'NEXT')
                        setCoupon(response.data.coupon)
                else {
                    swal({
                        title: "FALSE!",
                        text: "Your order not meet required coupon's requirement",
                        icon: "warning",
                        button: "OK",
                    })
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    const calculateTotal = () => {
        let total = 0;
        if(cartProducts.length !== 0){
            const result = cartProducts.map(product => product.defaultPrice[0] * product.quantity).reduce((a, b) => a + b)
            total = result;
        }
        return total
    }

    let finalPrice = calculateTotal()
    if(coupon) {
        finalPrice = (coupon.discountUnit === "PERCENTAGE") ? calculateTotal()*(1-coupon.discountValue/100) : calculateTotal()-coupon.discountValue
        if(finalPrice < 0) finalPrice = 0
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
                <div className='cart-info' style={{height:'30px'}}>
                    <div className='cart-product'>
                        <p>SUBTOTAL:</p>
                    </div>
                    <div className='cart-amount'>
                        <p><b>{calculateTotal()} VND</b></p>
                    </div>    
                </div>
                <div className='cart-info' style={{height:'30px'}}>
                    <div className='cart-product'>
                        <p><b>TOTAL:</b></p>
                    </div>
                    <div className='cart-amount'>
                        <p><b>{finalPrice} VND</b></p>
                    </div>    
                </div>
                <div className='cart-info'>
                    <div className='cart-product'>
                        <form>
                            <label>Coupon:
                                    <input 
                                        type="text" 
                                        name="coupon" 
                                        // value={inputs.fullName || ""} 
                                        onChange={handleCouponChange}
                                        />
                            </label>
                        </form>
                    </div>
                    <div className='cart-amount' style={{marginTop: '30px'}}>
                        <button className='btn_coupon' onClick={handleUseCouponClick}>Use</button>
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