import React, { useContext } from 'react'
import { MenuContext } from '../../../contexts/MenuContext'
import { FaceContext } from '../../../contexts/FaceContext'
import './style.css'

const CheckOut = () => {
    const {
        menuState: { order },
        makeOrder,
        clearOrder
    } = useContext(MenuContext)

    const {
        faceState: { customer }
    } = useContext(FaceContext)

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

    const handleOrder = async() => {
        const input = {
            id: customer.detectedCustomer._id,
            order: order,
            totalPrice: calculateTotal()
        }
        const reponse = await makeOrder(input)
        console.log(reponse)
        clearOrder()
    }

    return (
        <div className="checkout-container">
            <div className="total">
                <span>Total:</span>
                <span>{format(calculateTotal())} VND</span>
            </div>
            <button onClick={handleOrder}>CHECKOUT</button>
        </div>
    )
}

export default CheckOut