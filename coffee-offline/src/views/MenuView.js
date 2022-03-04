import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Header from '../components/header/index'
import Menu from '../components/menu/index'
import CustomerZone from '../components/customerzone'

const MenuView = () => {
  return (
    <div style={{overflow: "hidden", height: "100vh"}}>
        <Header />
        <div style={{padding: "20px 0"}}>
          <Container>
            <Row>
              <Col style={{ borderRight: "1px solid lightgray"}}>
                <CustomerZone />
              </Col>
              <Col xs={10}>
                <Menu />
              </Col>
            </Row>
          </Container>
        </div>
    </div>
  )
}

export default MenuView