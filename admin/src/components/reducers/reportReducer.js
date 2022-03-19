import {
	GET_INCOME_REPORT
} from './constants'

const reportReducer = (state, action) => {
    const { type, payload } = action;
    
    switch (type) {
        case GET_INCOME_REPORT: 
            return {
                ...state,
				incomeReport: payload,
				reportLoading: false
            }
        default:
            return state
    }
}

export default reportReducer
