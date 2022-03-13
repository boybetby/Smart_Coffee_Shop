import {
	DETECT_FACE,
    DETECT_FACE_FAIL,
    DETECTING,
    GET_CUSTOMER_ORDER
} from './constants'


const menuReducer = (state, action) => {
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
        default:
            return state
    }
}

export default menuReducer