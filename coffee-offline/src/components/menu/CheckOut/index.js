import React, { useContext } from 'react'
import { MenuContext } from '../../../contexts/MenuContext'
import { FaceContext } from '../../../contexts/FaceContext'
import swal from 'sweetalert'
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
        if(reponse.success) {
            swal({
                title: "SUCCESS!",
                text: "Order has been placed",
                icon: "success",
                button: "OK",
            })
        }
        else {
            swal({
                title: "OH NO!",
                text: "Something has gone wrong",
                icon: "error",
                button: "Try again",
            });
        }
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