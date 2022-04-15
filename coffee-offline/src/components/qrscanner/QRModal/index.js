import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import Scanner from '../Scanner/index'

const QRModal = (props) => {
    return (
        <div>
              <Modal
                {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    QR Scanner
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Scanner onClick={props.onHide} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default QRModal