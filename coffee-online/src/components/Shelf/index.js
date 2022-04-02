import React, { useContext } from 'react'
import { ShoppingContext } from '../ShoppingContext/ShoopingContext'
import Coupons from '../Coupons/index'
import Recommendation from '../Recommendation/index'

import './style.scss'

const Shelf = () => {
    const {productList, cartProducts, setCartProducts} = useContext(ShoppingContext)

    const addToCart = product => {
        if(!cartProducts.some(obj => obj._id === product._id)){
            product.quantity = 1;
            setCartProducts([...cartProducts, product])
        } else {
            product.quantity++;
            setCartProducts([...cartProducts])
        }
    }

    

    const format = num => 
        String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1.')

    return (
        <div>
            <Recommendation />
            <div className="shelf-container">
                {productList.productList.map(product => 
                    <div className="shelf-item" key={product._id}>
                        <div className="image-container">
                            <div style={{backgroundImage: `url("http://localhost:5000${product.drinkImage}")`}}
                                className="thumbnail">
                            </div>
                        </div>
                        <h3 className="title">{product.drinkName} </h3>
                        <div className="description">{product.description}</div>
                        
                        <div className="price">{format(product.defaultPrice[0])} VND</div>
                        <button onClick={() => {addToCart(product)}}>Add to Cart</button>
                    </div> 
                )}
            </div>
        </div>
    )
}

export default Shelf