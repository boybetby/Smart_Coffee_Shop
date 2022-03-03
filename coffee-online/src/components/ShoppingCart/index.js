import React, { useContext } from 'react';
import { ShoppingContext } from '../ShoppingContext/ShoopingContext'
import ShoppingCartItems from '../ShoppingCartItems/index'
import Checkout from "../Checkout/index"
import { slide as Menu } from 'react-burger-menu'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import './style.scss'


const ShoppingCart = () => {
  const {cartProducts} = useContext(ShoppingContext)


  return (
      <div>
        <button className="bm-burger-button">
          <ShoppingCartIcon className="cart"/>
          <div className={cartProducts.length > 0 ? "badge-counter-wrapper" : "quantity-none"}>
            <div className="badge-count">{cartProducts.length}</div>
          </div>
        </button> 
        <Menu isOpen={false} right>
          <div className="item-list">
              {cartProducts.length <= 0 && (<div className="empty-state"><ShoppingCartOutlinedIcon className="empty-cart"/><span>Your cart is empty</span></div>)}
              {cartProducts.map((product, index) => {
                 return <ShoppingCartItems key={index} 
                  title={product.drinkName} 
                  price={product.defaultPrice[0]} 
                  quantity={product.quantity}
                  thumbnail={product.drinkImage}/>
              })}
          </div>
          <Checkout />
        </Menu>
      </div>
  )
}

export default ShoppingCart
