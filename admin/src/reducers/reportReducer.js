import {
	GET_INCOME_REPORT,
    GET_INCOME_REPORT_BY_FILTER,
    GET_PRODUCTS_REPORT,
    GET_ORDERS_REPORT,
    GET_CUSTOMERS_REPORT,
    SEARCH_PRODUCTS,
    GET_USERS_REPORT
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
        case GET_PRODUCTS_REPORT:
            return {
                ...state,
                productsReport: payload,
                productsReportLoading: false
            }
        case GET_ORDERS_REPORT:
            return {
                ...state,
                ordersReport: payload,
                ordersReportLoading: false
            }
        case GET_CUSTOMERS_REPORT:
            return {
                ...state,
                customersReport: payload,
                customersReportLoading: false
            }
        case GET_USERS_REPORT:
            return {
                ...state,
                usersReport: payload,
                usersReportLoading: false
            }
        case SEARCH_PRODUCTS:
            return {
                ...state,
                searchProducts: payload,
            }
        default:
            return state
    }
}

export default reportReducer
