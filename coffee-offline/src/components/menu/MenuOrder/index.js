import React, { useContext } from 'react'
import { MenuContext } from '../../../contexts/MenuContext'
import Checkout from '../CheckOut/index'
import './style.css'

const MenuOrder = () => {
    const {
        menuState: { order },
        addItem,
        removeItem
    } = useContext(MenuContext)

    const format = num => 
        String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1.')

    return (
        <div className='order-container'>
            <div className='order_list'>
                {order.map(item => (
                    <div className="items-container">
                        <div className="item-info">
                            <div className="item-description">
                                <div className="title-cart">{item.drinkName}</div>
                                <div className="item-price">{format(item.defaultPrice[0])} VND</div>
                            </div>
                        </div>
                        
                        <div className="buttons-container">
                            <button className="remove-item" onClick={() => removeItem(item)}>-</button>
                            <button className="quantity-cart">{item.quantity}</button>
                            <button className="add-item" onClick={() => addItem(item)}>+</button>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <Checkout />
            </div>
        </div>
    )
}

export default MenuOrder