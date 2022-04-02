import React, { useState, useContext } from 'react'
import { ShoppingContext } from '../ShoppingContext/ShoopingContext'
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";
import addIcon from './coupon.svg'
import './style.css'
import LoginForm from '../LoginForm/index'
import CustomerCouponModal from './CustomerCouponModal'

const Coupons = () => {
    const {isAuthenticated, customer, customerCoupons}  = useContext(ShoppingContext)
    const [showCoupons, setShowCoupons] = useState(false)

    const [ selectedCoupon, setSelectedCoupon ] = useState()
    const [ modalShow, setModalShow ] = useState(false);
  
    const toggleCoupons = () => {
        if(showCoupons){
            setShowCoupons(false)
        }
        else{
            setShowCoupons(true)
        }
    }

    const handleClick = (e) => {
        setSelectedCoupon(e)
        setModalShow(true)
    }

    let couponsBody
    if(showCoupons){
        if(isAuthenticated){
            couponsBody = (
                <div className='coupons'>
                    <h4>Hi {customer.customerName}</h4>
                    <h5>Your coupons: </h5>
                    <div>
                        {(customerCoupons.length > 0)? customerCoupons.map(e => (
                            <p key={e.coupon._id} onClick={() => handleClick(e)}>{e.detail.couponName}</p>
                        )) : <p>You have no coupon</p>}
                    </div>
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
           {(selectedCoupon) ? (<CustomerCouponModal 
                 show={modalShow}
                 onHide={() => setModalShow(false)}
                 coupon= {selectedCoupon}
            />) : (<div></div>)}
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