import React, { useContext } from 'react'
import { MenuContext } from '../../../contexts/MenuContext'

const MenuOrder = () => {
    const {
        menuState: { order },
    } = useContext(MenuContext)

    console.log(order)

    return (
        <div>
            {order.map(item => (
                <p key={item._id}>{item.drinkName} - {item.quantity}</p>
            ))}
        </div>
    )
}

export default MenuOrder