import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useContext } from 'react';
import { ReportContext } from '../../contexts/reportContext';

const ProductModal = (props) => {
    const {
        updateProduct
    } = useContext(ReportContext)

    const [ category, setCategory ] = useState(props.product.category)
    const [ updateDisabled, setUpdateDisabled ] = useState(true)
    const [ updatedProduct, setUpdatedProduct ] = useState(props.product)

    const handleChange = (e) => {
        if(e.type === 'checkbox') {
            setUpdateDisabled(!updateDisabled)
        }
        else {
            setUpdatedProduct({ ...updatedProduct, [e.name]: e.value })
        }
    }

    const categoryToValue = () => {
        switch(category) {
            case 'TEA':
                return 'TEA'
            case 'COFFEE':
                return 'COFFEE'
            case 'FREEZE':
                return 'FREEZE'
        }
    }

    const handleUpdate = async() => {
        await updateProduct(updatedProduct)
    }

    return (
        <>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onShow={() => setUpdateDisabled(true)}
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Product's detail
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onChange={(e) => handleChange(e.target)}>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check to update product" />
                    </Form.Group>
                        <Form.Group className="mb-3" controlId="formDrinkName">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="drinkName" name='drinkName' defaultValue={props.product.drinkName} disabled={updateDisabled} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDrinkPrice">
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control type="drinkPrice" name='defaultPrice' defaultValue={props.product.defaultPrice[0]} disabled={updateDisabled} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDrinkDescription">
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control as="textarea" rows={3} type="drinkDescription" name='description' defaultValue={props.product.description} disabled={updateDisabled} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Product Category</Form.Label>
                            <Form.Select aria-label="Drink Category" name='category' defaultValue={categoryToValue()} onChange={(e) => setCategory(e.value)} disabled={updateDisabled} >
                                <option value="TEA">TEA</option>
                                <option value="COFFEE">COFFEE</option>
                                <option value="FREEZE">FREEZE</option>
                            </Form.Select>
                        </Form.Group>
                        {/* <Form.Group style={{margin: '15px 0'}}>
                            <Form.Label>Product Image</Form.Label>
                            <Form.Control type="file"  disabled={updateDisabled} name='drinkImage'/>
                        </Form.Group> */}
                        <Button variant="primary" disabled={updateDisabled} onClick={handleUpdate} style={{margin: '15px 0'}}>
                            Update
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

export default ProductModal