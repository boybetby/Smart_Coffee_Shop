import {
	DETECT_FACE,
    DETECT_FACE_FAIL
} from './constants'


const menuReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case DETECT_FACE: 
            return {
                ...state,
				customer: payload,
				isDetecting: false
            }
        case DETECT_FACE_FAIL:
            return {
                ...state,
                customer: 'Can not detect this customer',
				isDetecting: false
            }
        default:
            return state
    }
}

export default menuReducer