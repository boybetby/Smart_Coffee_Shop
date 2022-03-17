import React from 'react'
import Camera from './Camera/index'
import Information from './Infomation'
import Recommendation from './Recommendation'
import './style.css'

const CustomerZone = () => {
    return (
        <div className='customerZone'>
            <Camera />
            <Information />
            <Recommendation />
        </div>
    )
}

export default CustomerZone