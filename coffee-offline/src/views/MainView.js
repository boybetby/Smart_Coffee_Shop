import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Header from '../components/header/index'
import Menu from '../components/menu/index'

const MenuView = () => {
  return (
    <div>
        <Header />
        <div style={{padding: "20px 0"}}>
          <Container>
            <Row>
              <Col style={{ "border-right": "1px solid lightgray"}}>
                Face Detection
              </Col>
              <Col xs={9}>
                <Menu />
              </Col>
            </Row>
          </Container>
        </div>
    </div>
  )
}

export default MenuView