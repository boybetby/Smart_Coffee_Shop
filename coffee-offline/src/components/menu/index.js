import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import MenuList from './MenuList/index'
import MenuOrder from './MenuOrder'
import './style.css'

const Menu = () => {
  return (
    <Container>
        <Row>
            <Col xs={9}>
                <MenuList />
            </Col>
            <Col>
                <MenuOrder />
            </Col>
        </Row>
    </Container>
  )
}

export default Menu