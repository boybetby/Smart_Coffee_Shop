import React, { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { AuthContext } from '../../contexts/AuthContext'
import './style.css'

const Header = () => {
  const {
		authState: { user },
    logoutUser
	} = useContext(AuthContext)

  return (
    <div>
      <Navbar>
        <Container>
          <Navbar.Brand href="/menu">Coffee Shop</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="/" onClick={logoutUser} title="CLICK HERE TO LOGOUT">{user.name}</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header