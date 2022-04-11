


import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useContext } from 'react';
import { ReportContext } from '../../contexts/reportContext';

const CreateCouponModal = (props) => {
    const {
        createCoupon
    } = useContext(ReportContext)

    const [ newCoupon, setNewCoupon ] = useState()

    const handleChange = (e) => { 
        setNewCoupon({ ...newCoupon, [e.name]: e.value }) 
    }

    const handleSubmit = async(event) => {
        event.preventDefault()
        await createCoupon(newCoupon)
        setNewCoupon()
    }

    return (
        <>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onShow={() => setNewCoupon()}
                onClose={() => setNewCoupon()}
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Coupon's detail
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onChange={(e) => handleChange(e.target)} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formCouponName">
                            <Form.Label>Coupon name</Form.Label>
                            <Form.Control type="couponName" name='couponName' required />
                            <Form.Control.Feedback type="invalid">
                                Required field
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Coupon description</Form.Label>
                            <Form.Control as="textarea" rows={3} type="description" name='description' required />
                            <Form.Control.Feedback type="invalid">
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formCouponName">
                            <Form.Label>Start date (MM/DD/YYYY)</Form.Label>
                            <Form.Control type="startDate" name='startDate' required />
                            <Form.Control.Feedback type="invalid">
                                Required field
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formCouponName">
                            <Form.Label>End date (MM/DD/YYYY)</Form.Label>
                            <Form.Control type="endDate" name='endDate' required />
                            <Form.Control.Feedback type="invalid">
                                Required field
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* //applyto */}
                        <Form.Group className="mb-3" >
                            <Form.Label>Apply to</Form.Label>
                            <Form.Select aria-label="Apply to" name='applyTo' >
                                <option disabled selected>Coupon apply to</option>
                                <option value="EVERYONE">EVERYONE</option>
                                <option value="ACCOUNT">ACCOUNT</option>
                            </Form.Select>
                        </Form.Group>

                        {(newCoupon?.applyTo) && (
                            <>
                                {/* //usage */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Usage</Form.Label>
                                    <Form.Select aria-label="Usage" name='usage'    >
                                        <option disabled selected>Who can use this coupon</option>
                                        {(newCoupon?.applyTo === 'EVERYONE' || null) ? 
                                            (<option value="THIS">THIS</option>) :
                                            (
                                                <>
                                                    <option value="THIS">THIS</option>
                                                    <option value="NEXT">NEXT</option>
                                                </>
                                            )
                                        }
                                    </Form.Select>
                                </Form.Group>

                                {/* //conditionType */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Condition type</Form.Label>
                                    <Form.Select aria-label="Condition type" name='conditionType'    >
                                        <option disabled selected>Choose condition type</option>
                                        {(newCoupon?.applyTo === 'EVERYONE' || null) ? 
                                            (<option value="ONE_ORDER">ONE_ORDER</option>) :
                                            (
                                                <>
                                                    <option value="ALL_ORDERS">ALL_ORDERS</option>
                                                    <option value="ONE_ORDER">ONE_ORDER</option>
                                                </>
                                            )
                                        }
                                    </Form.Select>
                                </Form.Group>

                                {/* //conditionValue */}
                                <Form.Group className="mb-3" controlId="formConditionValue">
                                    <Form.Label>Condition value (VND)</Form.Label>
                                    <Form.Control type="conditionValue" name='conditionValue' required />
                                    <Form.Control.Feedback type="invalid">
                                        Required field
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* //discountUnit */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Discount unit</Form.Label>
                                    <Form.Select aria-label="Discount unit" name='discountUnit'    >
                                        <option disabled selected>Choose discount unit</option>
                                        <option value="PERCENTAGE">PERCENTAGE</option>
                                        <option value="AMOUNT">AMOUNT</option>
                                    </Form.Select>
                                </Form.Group>
                                
                                {/* //discountValue */}
                                <Form.Group className="mb-3" controlId="formDiscountValue">
                                    {(newCoupon?.discountUnit === 'PERCENTAGE') ? (<Form.Label>Discount value (%)</Form.Label>) :
                                        (<Form.Label>Discount value (VND)</Form.Label>)
                                    }
                                    <Form.Control type="discountValue" name='discountValue' required />
                                    <Form.Control.Feedback type="invalid">
                                        Required field
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </>
                        )}

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

export default CreateCouponModal