import React, { useContext } from 'react'
import { Card, Button } from 'react-bootstrap'
import { apiUrl }from '../../../reducers/constants'
import { MenuContext } from '../../../contexts/MenuContext'
import './style.css'

const MenuItem = ({ drink }) => {
    const {
        addOrder
    } = useContext(MenuContext)
    
    const format = num => 
        String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1.')

    return (
        <Card className="text-center" style={{ width: '14rem' }} id={`${drink._id}`}>
            <Card.Img variant="top" src={`${apiUrl}${drink.drinkImage}`} />
            <Card.Body>
                <div style={{height: "50px"}}>
                    <Card.Title>{drink.drinkName}</Card.Title>
                </div>
                <Card.Text>{format(drink.defaultPrice[0])} VND</Card.Text>
                <Button variant="primary" onClick={() => addOrder(drink)}>Add to order</Button>
            </Card.Body>
        </Card>
    )
}

export default MenuItem