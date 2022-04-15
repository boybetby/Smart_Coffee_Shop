import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import QRModal from '../../qrscanner/QRModal'
import './style.css'

const QRScanner = () => {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <div className="qrscanner">
            <QRModal 
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <Button onClick={() => setModalShow(true)}>Open QR Scan</Button>
        </div>
    )
}

export default QRScanner