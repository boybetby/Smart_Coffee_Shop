import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const CouponModal = (props) => {
    return (
        <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Coupon detail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 style={{color: 'green'}}>Copy this to use</h5>
          <p>
            {props.coupon._id}
          </p>

          <h5>Coupon's Name</h5>
          <p>
            {props.coupon.couponName}
          </p>

          <h5>Condition</h5>
          <p>
            Order is more than {props.coupon.conditionValue} VND
          </p>

          <h5>End Date</h5>
          <p>
            {props.coupon.endDate}
          </p>

          <h5>Description</h5>
          <p>
            {props.coupon.description}
          </p>

          <h5>Who can use?</h5>
          <p>
            {props.coupon.applyTo}
          </p>

          <h5>Discount</h5>
          <p>
            {props.coupon.discountValue} {(props.coupon.discountUnit === 'AMOUNT') ? 'VND' : '%'}
          </p>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default CouponModal