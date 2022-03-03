import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import MenuList from './menulist/index'

const Menu = () => {
  return (
    <Container>
        <Row>
            <Col xs={8}>
                <MenuList />
            </Col>
            <Col>
                1 of 3
            </Col>
        </Row>
    </Container>
  )
}

export default Menu