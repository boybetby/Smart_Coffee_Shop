import React, { useContext } from 'react'
import Webcam from "react-webcam";
import { Button } from 'react-bootstrap'
import { FaceContext } from '../../../contexts/FaceContext'
import './style.css'

const Camera = () => {
    const webcamRef = React.useRef(null);

    const {
        detectFace
    } = useContext(FaceContext)

    const handleClick = async() => {
        const imageSrc = webcamRef.current.getScreenshot();
        await detectFace(imageSrc)
    }

    return (
        <div className='camera'>
            <Webcam className={'webcam'}
                audio={false}
                width={130}
                height={130}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                forceScreenshotSourceSize="true"
            />
            <Button variant="primary" className='btn_camera' onClick={handleClick}>DETECT</Button>
        </div>
    )
}

export default Camera