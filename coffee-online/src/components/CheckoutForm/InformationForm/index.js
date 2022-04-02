import React, { useState, useEffect, useContext } from 'react';
import { ShoppingContext } from '../../ShoppingContext/ShoopingContext'
import { apiUrl } from '../../../constants/constants'
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert'
import axios from 'axios'

const Information = () => {  
  const [inputs, setInputs] = useState({});
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const {cartProducts, setCartProducts, orderType, coupon, setCoupon, couponId} = useContext(ShoppingContext)

  useEffect(() => {
    loadProvince()
  }
  ,[])

  const calculateTotal = () => {
    let total = 0;
    if(cartProducts.length !== 0){
        const result = cartProducts.map(product => product.defaultPrice[0] * product.quantity).reduce((a, b) => a + b)
        total = result;
    }
    return total
  }

  if(coupon) {
    const finalPrice = (coupon.discountUnit === "PERCENTAGE") ? calculateTotal()*(1-coupon.discountValue/100) : calculateTotal()-coupon.discountValue
    console.log(finalPrice)
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    const order = inputs
    order.products = cartProducts
    order.totalprice = calculateTotal()
    order.type = orderType
    const address = {
      province: province.find(x => x.ProvinceID == order.province).ProvinceName,
      district: district.find(x => x.DistrictID == order.district).DistrictName,
      ward: ward.find(x => x.WardCode === order.ward).WardName
    }

    let finalPrice = order.totalprice
    if(coupon) finalPrice = (coupon.discountUnit === "PERCENTAGE") ? order.totalprice*(1-coupon.discountValue/100) : order.totalprice-coupon.discountValue

    const response = await axios({
      method: 'post',
      url:  `${apiUrl}/api/order/orderonline`,
      data: {
        customer: order.phoneNumber,
        customerName: order.fullName,
        drinks: order.products,
        totalPrice: order.totalprice,
        finalPrice: finalPrice,
        coupon: couponId || null,
        type: order.type,
        customerAddress: `${order.address}, ${address.ward}, ${address.district}, ${address.province}`
      }
    });
    if(response.data.success){
      console.log(response.data)
      if(response.data.newCoupons) {
        setCoupon()
        swal({
          title: "SUCCESS!",
          text: (response.data.newCoupons.length===1) ? `You have received a new coupon` : `You have received ${response.data.newCoupons.length} new coupons`,
          icon: "success",
          button: "OK",
        }).then(() => {
          afterDone()
        });
      }
      else {
        setCoupon()
        swal({
          title: "SUCCESS!",
          text: "Your order has been placed",
          icon: "success",
          button: "OK",
        }).then(() => {
          afterDone()
        });
      }
    }
    else {
      swal({
        title: "OH NO!",
        text: "Something has gone wrong",
        icon: "error",
        button: "Try again",
      });
    }
  }

  let navigate = useNavigate();

  const afterDone = () => {
    setCartProducts([])
    navigate(`/`)
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleProvinceChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    loadDistrict(value)
    setInputs(values => ({...values, [name]: value}))
  }

  const handleDistrictChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    loadWard(value)
    setInputs(values => ({...values, [name]: value}))
  }

  let provinceOption = (
    <option value="none">...</option>
  )
  if(province){
    provinceOption = (
      province.map((option) => (
        <option value={option.ProvinceID} key={option.ProvinceID}>{option.ProvinceName}</option>
      ))
    )
  }

  let districtOption
  if(district){
    districtOption = (
      district.map((option) => (
        <option value={option.DistrictID} key={option.DistrictID}>{option.DistrictName}</option>
      ))
    )
  }

  let wardOption
  if(ward){
    wardOption = (
      ward.map((option) => (
        <option value={option.WardCode} key={option.WardCode}>{option.WardName}</option>
      ))
    )
  }

  const provinceApi = "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data"
  const loadProvince = async() => {
    try {
        const response = await axios({
            method: 'get',
            url:  `${provinceApi}/province`,
            headers: {
              'token': '33103c88-ec46-11eb-9388-d6e0030cbbb7'
            }
        });
        setProvince(response.data.data)
    } catch (error) {
        console.log(error)
    }
  }
  const loadDistrict = async(value) => {
    try {
        const response = await axios({
          method: 'get',
          url:  `${provinceApi}/district`,
          headers: {
            'token': '33103c88-ec46-11eb-9388-d6e0030cbbb7'
          }
        });
        const districtdata = response.data.data.filter(x => x.ProvinceID == value)
        setDistrict(districtdata)
    } catch (error) {
        console.log(error)
    }
  }
  const loadWard = async(value) => {
    try {
        const response = await axios({
            method: 'get',
            url:  `${provinceApi}/ward?district_id=${value}`,
            headers: {
              'token': '33103c88-ec46-11eb-9388-d6e0030cbbb7'
            }
        });
        setWard(response.data.data)
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div>
      <div style={{textAlign: "center"}}><h3>YOUR SHIPPING INFORMATION</h3></div>
      <form onSubmit={handleSubmit}>
        <label>Fullname:
          <input 
            type="text" 
            name="fullName" 
            value={inputs.fullName || ""} 
            onChange={handleChange}
            required = {true}
          />
        </label>
        <label>Phone number:
          <input 
            type="text" 
            name="phoneNumber" 
            value={inputs.phoneNumber || ""} 
            onChange={handleChange}
            required = {true}
          />
        </label>
        <label>Province
          <select id="Province" name="province" onChange={handleProvinceChange}>
            <option value="none">...</option>
            {provinceOption}
          </select>
        </label>
        <label>District
          <select id="District" name="district" onChange={handleDistrictChange}>
            <option value="none">...</option>
            {districtOption}
          </select>
        </label>
        <label>Ward
          <select id="Ward" name="ward" onChange={handleChange}>
            <option value="australia">...</option>
            {wardOption}
          </select>
        </label>
        <label>Address
          <input 
            type="text" 
            name="address" 
            value={inputs.address || ""} 
            onChange={handleChange}
            required = {true}
          />
        </label>
      
        <input type="submit" value={"Order"}/>
      </form>
    </div>
  )
}

export default Information