import React, { useState, useContext } from 'react'
import { ShoppingContext } from '../ShoppingContext/ShoopingContext'
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";
import addIcon from './coupon.svg'
import './style.css'
import LoginForm from '../LoginForm/index'

const Coupons = () => {
    const {isAuthenticated, customer}  = useContext(ShoppingContext)
    const [showCoupons, setShowCoupons] = useState(false)
    const toggleCoupons = () => {
        if(showCoupons){
            setShowCoupons(false)
        }
        else{
            setShowCoupons(true)
        }
    }

    let couponsBody
    if(showCoupons){
        if(isAuthenticated){
            couponsBody = (
                <div className='coupons'>
                    <h2 style={{"width": "200px"}}>Hi {customer.customerName}</h2>
                </div>
            )
        }
        else {
            couponsBody = (
                 <div className='coupons'>
                 <h2 style={{"width": "200px"}}>Please login to see your coupons</h2>
                 <LoginForm />
                 <p>
                     <Link to='/register'>
                         Or register here!
                     </Link>
                 </p> 
             </div>
            )
        }
    }

    return (
        <div>
           {couponsBody}
            <Button
                className='btn-floating'
                onClick={toggleCoupons.bind(this, true)}
            >
                <img src={addIcon} alt='add-post' width='60' height='60' />
            </Button>
        </div>
    )
}

export default Coupons