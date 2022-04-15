import React, { useContext } from 'react'
import { FaceContext } from '../../../contexts/FaceContext'
import { Container } from 'react-bootstrap'
import { QrReader } from 'react-qr-reader';

const Scanner = ({onClick}) => {
    const {
        authCustomer
    } = useContext(FaceContext)

    const qrscanCustomer = async(id) => {
        await authCustomer(id)
        onClick()
    }

    return (
        <Container style={{padding: "5px"}}>
            
                <QrReader
                    onResult={(result, error) => {
                    if (!!result) {
                        qrscanCustomer(result?.text);
                    }

                    if (!!error) {
                        console.info(error);
                    }
                    }}
                    style={{ width: '100%' }}
                />
                
            </Container>
    )
}

export default Scanner