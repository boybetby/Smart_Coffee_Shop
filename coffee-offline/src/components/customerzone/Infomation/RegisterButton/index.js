import React, { useContext, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { FaceContext } from '../../../../contexts/FaceContext'
import './style.css'

const RegisterButton = () => {
    const {
        faceState: { customer },
        RegisterCustomer,
        showRegisterModal,
        setShowRegisterModal
    } = useContext(FaceContext)

    const [newCustomer, setNewCustomer] = useState({
		name: '',
		phonenumber: ''
	})

    const { name, phonenumber } = newCustomer

	const onChangeNewCustomerForm = event =>
        setNewCustomer({ ...newCustomer, [event.target.name]: event.target.value })

    const closeDialog = () => {
        resetAddPostData()
    }
    
    const onSubmit = async event => {
        event.preventDefault()
		const response = await RegisterCustomer(customer.detectedCustomer._id, newCustomer)
		resetAddPostData()
	}

	const resetAddPostData = () => {
		setNewCustomer({ name: '', phonenumber: '' })
        setShowRegisterModal(false)
	}

    return (
        <div className='registerButton'>
            <Button onClick={()=> setShowRegisterModal(true)} >Register this cumstomer</Button>
            <Modal show={showRegisterModal} onHide={closeDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Customer infomation</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Control
                                type='name'
                                placeholder='Customer name'
                                name='name'
                                required
                                aria-describedby='title-help'
                                value={name}
                                onChange={onChangeNewCustomerForm}
                            />
                        </Form.Group>
                        <div style={{height: '20px'}}></div>
                        <Form.Group>
                            <Form.Control
                                    type='phonenumber'
                                    placeholder='Phone number'
                                    name='phonenumber'
                                    required
                                    aria-describedby='title-help'
                                    value={phonenumber}
                                    onChange={onChangeNewCustomerForm}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={closeDialog}>
                            Cancel
                        </Button>
                        <Button variant='primary' type='submit'>
                            Register
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}

export default RegisterButton