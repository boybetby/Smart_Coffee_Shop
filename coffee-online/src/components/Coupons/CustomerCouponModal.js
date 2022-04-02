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
            Customer's Coupon Detail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 style={{color: 'green'}}>Copy this to use</h5>
          <p>
            {props.coupon.coupon._id}
          </p>

          <h5>Coupon's Name</h5>
          <p>
            {props.coupon.detail.couponName}
          </p>

          <h5>Condition</h5>
          <p>
            Order is more than {props.coupon.detail.conditionValue} VND
          </p>

          <h5>End Date</h5>
          <p>
            {props.coupon.detail.endDate}
          </p>

          <h5>Description</h5>
          <p>
            {props.coupon.detail.description}
          </p>

          <h5>Who can use?</h5>
          <p>
            {props.coupon.detail.applyTo}
          </p>

          <h5>Discount</h5>
          <p>
            {props.coupon.detail.discountValue} {(props.coupon.detail.discountUnit === 'AMOUNT') ? 'VND' : '%'}
          </p>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.coupon.detail.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default CouponModal