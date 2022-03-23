import {
	DETECT_FACE,
    DETECT_FACE_FAIL,
    GET_FACEDATA,
    DETECTING,
    GET_CUSTOMER_ORDER,
    GET_CUSTOMER_RECOMMENDATION,
    CLEAR_CUSTOMER_RECOMMENDATION
} from './constants'


const faceReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case DETECT_FACE: 
            return {
                ...state,
				customer: payload
            }
        case DETECT_FACE_FAIL:
            return {
                ...state,
                customer: 'Can not detect this customer'
            }
        case GET_FACEDATA:
            return {
                ...state,
                faceData: payload
            }
        case DETECTING:
            return {
                ...state,
                isDetecting: payload
            }
        case GET_CUSTOMER_ORDER:
            return {
                ...state,
                customerOrder: payload
            }
        case GET_CUSTOMER_RECOMMENDATION:
            return {
                ...state,
                customerRecommendation: payload
            }
        case CLEAR_CUSTOMER_RECOMMENDATION:
            return {
                ...state,
                customerRecommendation: null
            }
        default:
            return state
    }
}

export default faceReducer