import React, { useContext } from 'react'
import { FaceContext } from '../../../contexts/FaceContext'
import './style.css'

const Information = () => {
    const {
        faceState: { customer }
    } = useContext(FaceContext)

    let informationBody = (
        <p>No information detected</p>
    )
    if(customer){
        if(!customer.existedCustomer){
            informationBody = (
                <p>This is new customer</p>
            )
        }
        else {
            if(customer.detectedCustomer.customerName === 'unknown') {
                informationBody = (
                    <p>This customer has no account</p>
                )
            }
            else {
                informationBody = (
                    <p>${customer.detectedCustomer.customerName}</p>
                )
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