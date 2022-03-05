import React from 'react'
import Camera from './Camera/index'
import Information from './Infomation'
import './style.css'

const CustomerZone = () => {
    return (
        <div className='customerZone'>
            <Camera />
            <Information />
        </div>
    )
}

export default CustomerZone