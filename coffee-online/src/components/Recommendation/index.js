import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import './style.css'
import { apiUrl } from '../../constants/constants'
import { ShoppingContext } from '../ShoppingContext/ShoopingContext'

const Recommendation = () => {
	const { customer, cartProducts, setCartProducts} = useContext(ShoppingContext)
    const [ recommendedProducts, setRecommendedProducts ] = useState()
    
    const addToCart = product => {
        if(!cartProducts.some(obj => obj._id === product._id)){
            product.quantity = 1;
            setCartProducts([...cartProducts, product])
        } else {
            product.quantity++;
            setCartProducts([...cartProducts])
        }
    }
    
    const getProductRecommendation = async() => {
        const response = await axios({
            method: 'post',
            url: `${apiUrl}/api/customer/getProductRecommentdation`,
            data: {
                id: customer._id
            }
        });
        const data = response.data.result
        await setRecommendedProducts(data)
    }
    
    const format = num => 
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1.')
    
    if(customer._id) {
        if(!recommendedProducts)
            getProductRecommendation();
    }

    
    let recommendationBody = (
        <div className='shelf-container'>
            You have not logged in yet!
        </div>
    )

    if(recommendedProducts) {
        recommendationBody = (
            <div className="recommendation_zone">
                <h1>RECOMMENDED JUST FOR YOU</h1>
                <div className="shelf-container recommendation" >
                    {recommendedProducts.map(product => 
                        <div className="shelf-item" key={product._id}>
                            <div className="image-container">
                                <div style={{backgroundImage: `url("http://localhost:5000${product.drinkImage}")`}}
                                    className="thumbnail">
                                </div>
                            </div>
                            <h3 className="title">{product.drinkName} </h3>                        
                            <div className="price">{format(product.defaultPrice[0])} VND</div>
                            <button onClick={() => {addToCart(product)}}>Add to Cart</button>
                        </div> 
                    )}
                </div>
            </div>
        )
    }

    return (
        <div>
            {recommendationBody}
            <hr className="thin"></hr>
        </div>
    )
}

export default Recommendation