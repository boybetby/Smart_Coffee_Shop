import React, { useContext } from 'react'
import { FaceContext } from '../../../contexts/FaceContext'
import './style.css'

const Recommendation = () => {
    const {
        faceState: { customerRecommendation }
    } = useContext(FaceContext)

    let recommendationBody = (<div></div>)
    if(customerRecommendation) {
        recommendationBody = (
            <div>
                <p><b>RECOMMENDATION</b></p>
                {customerRecommendation.map(product => 
                     <p key={product._id}>{product.drinkName}</p>
                )}
            </div>
        )
    }

    return (
        <div className='recommendation'>
            {recommendationBody}
        </div>
    )
    }

export default Recommendation