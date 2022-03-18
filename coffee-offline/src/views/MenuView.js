import React, { useContext } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Navigate } from "react-router-dom";
import Header from '../components/header/index'
import Menu from '../components/menu/index'
import CustomerZone from '../components/customerzone'
import { AuthContext } from '../contexts/AuthContext';

const MenuView = () => {
  const {
    authState: { isAuthenticated },
	} = useContext(AuthContext)
  
  let body = (
    <div style={{overflow: "hidden", height: "100vh"}}>
            <Header />
            <div style={{padding: "20px 0"}}>
              <div className='menuContainer'>
                <Row>
                  <Col style={{ borderRight: "1px solid lightgray"}}>
                    <CustomerZone />
                  </Col>
                  <Col xs={10}>
                    <Menu />
                  </Col>
                </Row>
              </div>
            </div>
        </div>
  )

  if(!isAuthenticated) {
    body = (
      <>
        <Navigate to='/' />
      </>
    )
  }

  return (
    <div>
        {body}
    </div>
  )
}

export default MenuView