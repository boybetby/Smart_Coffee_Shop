import React, { useState, useContext } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AlertMessage from './AlertMessage'
import axios from 'axios'
import { ShoppingContext } from '../ShoppingContext/ShoopingContext'
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from '../../constants/constants'

import './style.css'

const LoginForm = ({getCustomerCoupons}) => {
	const {loadUser, customer} = useContext(ShoppingContext)

	const [loginForm, setLoginForm] = useState({
		username: '',
		password: ''
	})
	const [alert, setAlert] = useState(null)
	const { username, password } = loginForm

	const onChangeLoginForm = event =>
		setLoginForm({ ...loginForm, [event.target.name]: event.target.value })

	const login = async event => {
		event.preventDefault()
		try {
			const response = await axios({
				method: 'post',
				url: `${apiUrl}/api/customer/login`,
				data: loginForm
			});
			if (!response.data.success) {
				setAlert({ type: 'danger', message: response.data.message })
				setTimeout(() => setAlert(null), 5000)
			}
			if (response.data.success) {
				localStorage.setItem(
					LOCAL_STORAGE_TOKEN_NAME,
					response.data.accessToken
					)
				}
				
				await loadUser()
		} catch (error) {
			console.log(error)
		}
	}

	

	return (
		<div className='loginForm'>
			<Form className='my-4' onSubmit={login}>
				<AlertMessage info={alert} />
				<Form.Group>
					<Form.Control
						type='text'
						placeholder='Username'
						name='username'
						required
						value={username}
						onChange={onChangeLoginForm}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type='password'
						placeholder='Password'
						name='password'
						required
						value={password}
						onChange={onChangeLoginForm}
					/>
				</Form.Group>
				<Button variant='success' type='submit'>
					Login
				</Button>

			</Form>
		</div>
	)
}

export default LoginForm