import React, { useContext } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { FaceContext } from '../../../contexts/FaceContext'
import RegisterButton from './RegisterButton'
import './style.css'

const Information = () => {
    const {
        faceState: { customer, customerOrder, isDetecting }
    } = useContext(FaceContext)

    let informationBody = (
        <p>No information detected</p>
    )

    if(isDetecting) {
        informationBody = (
            <div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
        )
    } else {
        if(customer){
            if(!customer.existedCustomer){
                informationBody = (
                    <div>
                        <p>This is new customer</p>
                        <RegisterButton />
                    </div>
                )
            }
            else {
                if(customer.detectedCustomer.customerName === 'unknown') {
                    informationBody = (
                        <div>
                            <p>This customer has no account</p>
                            <RegisterButton />
                        </div>
                    )
                }
                else {
                    if(customerOrder.length !== 0){
                        informationBody = (
                            <div>
                                <p><b>{customer.detectedCustomer.customerName}</b></p>
                                {customerOrder.map(order => (
                                    <p key={order._id}>{order.drinkName}: {order.quantity}</p>
                                ))}
                            </div>
                        )
                    }
                    else {
                        informationBody = (
                            <div>
                                <p>{customer.detectedCustomer.customerName}</p>
                                <p>This customer has no order</p>
                            </div>
                        )
                    }
                }
            }
        }
    }
    
    return (
        <div className='information'>
            {informationBody}
        </div>
    )
}

export default Information