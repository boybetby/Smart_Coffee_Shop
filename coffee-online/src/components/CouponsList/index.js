import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { apiUrl } from '../../constants/constants'
import CouponModal from './CouponModal'
import './style.css'

function CouponsList() {
    const [ coupons, setCoupons ] = useState()
    const [ selectedCoupon, setSelectedCoupon ] = useState()
    const [modalShow, setModalShow] = useState(false);

    const getCoupons = async() => {
        try {
            const response = await axios({
                method: 'get',
                url:  `${apiUrl}/api/coupon`
            });
            if(response.data.success) setCoupons(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleClick = (e) => {
        setSelectedCoupon(e)
        setModalShow(true)
    }

    useEffect(() => {
        getCoupons()
    }, [])

    let publicCoupons = (
        <p>0 coupon is available for everyone right now</p>
    )
    let accountCoupons = (
        <p>0 coupon is available for accounts right now</p>
    )

    if(coupons) {
        if(coupons.public.length!==0) {
            publicCoupons = coupons.public.map(e => (
                <div>
                    <p onClick={() => handleClick(e)}>{e.couponName}</p>
                </div>
            ))
        }
        if(coupons.account.length!==0) {
            accountCoupons = coupons.account.map(e => (
                <div>
                    <p onClick={() => handleClick(e)}>{e.couponName}</p>
                </div>
            ))
        }
    }

    return (
        <div className='couponsSection'>
            {(selectedCoupon) ? (<CouponModal 
                 show={modalShow}
                 onHide={() => setModalShow(false)}
                 coupon= {selectedCoupon}
            />) : (<div></div>)}
            <div style={{textAlign: "center"}}><h3>COUPONS</h3></div>
            <h4>Coupons for everyone</h4>
            {publicCoupons}
            <h4>Coupons for accounts</h4>
            {accountCoupons}
        </div>
    )
}

export default CouponsList