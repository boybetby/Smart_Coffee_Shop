import React, { useContext } from 'react'
import './style.scss'
import { ShoppingContext } from '../ShoppingContext/ShoopingContext'

const ShoppingCartItems = ({ title, price, quantity, thumbnail}) => {

    const { cartProducts, setCartProducts } = useContext(ShoppingContext)

    const addItem = product => {
        const item = cartProducts.find(item => item.drinkName === product)
        item.quantity++
        setCartProducts([...cartProducts])
    }

    const removeItem = product => {
        const item = cartProducts.find(item => item.drinkName === product)
        const itemIndex = cartProducts.indexOf(item)
        
        if(item.quantity > 1){
            item.quantity--
        } else {
            cartProducts.splice(itemIndex, 1)
        }
        setCartProducts([...cartProducts])
    }

    return (
        <div className="items-container">
            <div className="item-info">
                <div className="thumbnail-container">
                    <div className="thumbnail-cart" style={{backgroundImage: `url("http://localhost:5000${thumbnail}")`}}>
                    </div>
                </div>
                <div className="item-description">
                    <div className="title-cart">{title}</div>
                    <div className="item-price">{price} VND</div>
                </div>
            </div>
            
            <div className="buttons-container">
                <button className="remove-item" onClick={() => removeItem(title)}>-</button>
                <button className="quantity-cart">{quantity}</button>
                <button className="add-item" onClick={() => addItem(title)}>+</button>
            </div>
        </div>
    )
}

export default ShoppingCartItems
