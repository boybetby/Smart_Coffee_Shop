import React, { useContext } from 'react'
import { MenuContext } from '../../../contexts/MenuContext'
import './style.css'

const CheckOut = () => {
    const {
        menuState: { order }
    } = useContext(MenuContext)

    const format = num => 
        String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1.')

    const calculateTotal = () => {
        let total = 0;
        if(order.length !== 0){
            const result = order.map(product => product.defaultPrice[0] * product.quantity).reduce((a, b) => a + b)
            total = result;
        }
        return total
    }

    return (
        <div className="checkout-container">
            <div className="total">
                <span>Total:</span>
                <span>{format(calculateTotal())} VND</span>
            </div>
            <button>CHECKOUT</button>
        </div>
    )
}

export default CheckOut