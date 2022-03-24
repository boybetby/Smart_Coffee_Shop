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

    console.log(customer)

    if(isDetecting) {
        informationBody = (
            <div className=''>
				<Spinner animation='border' variant='info' />
			</div>
        )
    } else {
        if(customer){
            if(customer.newCustomer){
                informationBody = (
                    <div>
                        <p>This is new customer</p>
                        <RegisterButton />
                    </div>
                )
            }
            else {
                if(customer.customer.customerName === 'unknown') {
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
                                <p><b>{customer.customer.customerName}</b></p>
                                {customerOrder.map(order => (
                                    <p key={order._id}>{order.drinkName}: {order.quantity}</p>
                                ))}
                            </div>
                        )
                    }
                    else {
                        informationBody = (
                            <div>
                                <p>{customer.customer.customerName}</p>
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