import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { QrReader } from 'react-qr-reader';

const Scanner = () => {
    const [data, setData] = useState('No result');

    return (
        <Container style={{padding: "5px"}}>
            <Row>
                <Col>
                <QrReader
                    onResult={(result, error) => {
                    if (!!result) {
                        setData(result?.text);
                    }

                    if (!!error) {
                        console.info(error);
                    }
                    }}
                    style={{ width: '100%' }}
                />
                
                </Col>
                <Col xs={7}>
                    <p>{data}</p>
                </Col>
            </Row>
            </Container>
    )
}

export default Scanner