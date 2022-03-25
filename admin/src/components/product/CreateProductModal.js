import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useContext } from 'react';
import { ReportContext } from '../../contexts/reportContext';

const CreateProductModal = (props) => {
    const {
        createProduct
    } = useContext(ReportContext)

    const [ newProduct, setNewProduct ] = useState()

    console.log(newProduct)

    const handleChange = (e) => {
        if(e.type === 'file') {
            setNewProduct({ ...newProduct, [e.name]: e.files[0] })
        }
        else {
            setNewProduct({ ...newProduct, [e.name]: e.value })
        }
    }

    const handleSubmit = async() => {
        await createProduct(newProduct)
        setNewProduct()
    }

    const [validated, setValidated] = useState(false);


    return (
        <>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onShow={() => setNewProduct()}
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Product's detail
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onChange={(e) => handleChange(e.target)} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formDrinkName">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="drinkName" name='drinkName' required />
                            <Form.Control.Feedback type="invalid">
                                Required field
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDrinkPrice">
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control type="drinkPrice" name='defaultPrice' required />
                            <Form.Control.Feedback type="invalid">
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDrinkDescription">
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control as="textarea" rows={3} type="drinkDescription" name='description' required />
                            <Form.Control.Feedback type="invalid">
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Product Category</Form.Label>
                            <Form.Select aria-label="Drink Category" name='category'    >
                                <option disabled selected>Select category</option>
                                <option value="TEA">TEA</option>
                                <option value="COFFEE">COFFEE</option>
                                <option value="FREEZE">FREEZE</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group style={{margin: '15px 0'}}>
                            <Form.Label>Product Image</Form.Label>
                            <Form.Control type="file" name='drinkImage' required />
                        </Form.Group>
                        <Button variant="primary" type="submit" style={{margin: '15px 0'}}>
                            Create
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CreateProductModal