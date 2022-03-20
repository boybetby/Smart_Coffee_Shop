import {
	GET_INCOME_REPORT,
    GET_INCOME_REPORT_BY_FILTER
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
        case GET_INCOME_REPORT_BY_FILTER:
            return {
                ...state,
                incomeReportByFilter: payload,
                reportbyFilterLoading: false
            }
        default:
            return state
    }
}

export default reportReducer
