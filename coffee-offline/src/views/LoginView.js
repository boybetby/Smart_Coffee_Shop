import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'
import LoginForm from '../components/loginform/index';

const LoginView = () => {
  const {
		authState: { authLoading, isAuthenticated }
	} = useContext(AuthContext)

  let navigate = useNavigate();

	let body

	if(authLoading) {
    body = (
      <div className='d-flex justify-content-center mt-2'>
        <Spinner animation='border' variant='info' />
      </div>
    )
  }
  else if (isAuthenticated) navigate(`/menu`)
  else
		body = (
			<>
        <LoginForm />
			</>
		)


  return (
    <div className='landing'>
    <div className='dark-overlay'>
      <div className='landing-inner'>
        <h1>Smart Coffee</h1>
        {body}
      </div>
    </div>
  </div>
  )
}

export default LoginView