import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import AlertMessage from '../LoginForm/AlertMessage'
import axios from 'axios'
import './style.css'

const RegisterForm = () => {
    const [registerForm, setRegisterForm] = useState({
		username: '',
		password: '',
		confirmPassword: '',
        customerName: ''
	})

    const [alert, setAlert] = useState(null)

	const { username, password, confirmPassword, customerName } = registerForm

    const URL = "http://localhost:5000"
    const registerCustomer = async(registerInfo) => {
        console.log(registerInfo)
        const response = await axios({
            method: 'post',
            url:  `${URL}/api/customer/register`,
            data: {
                registerInfo
            }
        });
        return response
    }

    const onChangeRegisterForm = event =>
		setRegisterForm({
			...registerForm,
			[event.target.name]: event.target.value
		})

	const register = async event => {
		event.preventDefault()

		if (password !== confirmPassword) {
			setAlert({ type: 'danger', message: 'Passwords do not match' })
			setTimeout(() => setAlert(null), 5000)
			return
		}

		try {
			const registerData = await registerCustomer(registerForm)
            console.log(registerData)
			if (!registerData.success) {
				setAlert({ type: 'danger', message: registerData.data.message })
				setTimeout(() => setAlert(null), 5000)
			}
		} catch (error) {
			console.log(error)
		}
	}

    return (
        <div className='register_container'>
            <h2>Create your account</h2>
            <Form className='mb-3' onSubmit={register}>
                <AlertMessage info={alert} />

                <Form.Group>
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter your phone number'
                        name='username'
                        required
                        value={username}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter your password'
                        name='password'
                        required
                        value={password}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm your password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm your Password'
                        name='confirmPassword'
                        required
                        value={confirmPassword}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Full name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter your full name'
                        name='customerName'
                        required
                        value={customerName}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Button variant='success' type='submit'>
                    Register
                </Button>
            </Form>
        </div>
    )
}

export default RegisterForm