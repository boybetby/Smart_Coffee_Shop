import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

const CouponModal = (props) => {
    return (
        <>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Coupon's detail
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formDrinkName">
                            <Form.Label>Coupon Name</Form.Label>
                            <Form.Control disabled type="couponName" name='couponName' defaultValue={props.coupon.couponName} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDrinkName">
                            <Form.Label>Start</Form.Label>
                            <Form.Control disabled type="startDate" name='startDate' defaultValue={props.coupon.startDate} />
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="formDrinkName">
                            <Form.Label>End</Form.Label>
                            <Form.Control disabled type="endDate" name='endDate' defaultValue={props.coupon.endDate}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDrinkName">
                            <Form.Label>Description</Form.Label>
                            <Form.Control disabled type="description" name='description' defaultValue={props.coupon.description}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDrinkName">
                            <Form.Label>Apply to</Form.Label>
                            <Form.Control disabled type="applyTo" name='applyTo' defaultValue={props.coupon.applyTo}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDrinkName">
                            <Form.Label>Usage</Form.Label>
                            <Form.Control disabled type="usage" name='usage' defaultValue={props.coupon.usage}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDrinkName">
                            <Form.Label>Condition Type</Form.Label>
                            <Form.Control disabled type="conditionType" name='conditionType' defaultValue={props.coupon.conditionType}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDrinkName">
                            <Form.Label>Condition Value</Form.Label>
                            <Form.Control disabled type="drinkName" name='drinkName' defaultValue={props.coupon.conditionValue}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDrinkName">
                            <Form.Label>Discount Unit</Form.Label>
                            <Form.Control disabled type="drinkName" name='drinkName' defaultValue={props.coupon.discountUnit}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDrinkName">
                            <Form.Label>Discount Value</Form.Label>
                            <Form.Control disabled type="drinkName" name='drinkName' defaultValue={props.coupon.discountValue}/>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CouponModal