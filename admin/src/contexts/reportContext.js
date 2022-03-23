import React, { createContext, useEffect, useReducer } from 'react'
import reportReducer from '../reducers/reportReducer'
import axios from 'axios'
import {
    apiUrl,
	GET_INCOME_REPORT,
    GET_INCOME_REPORT_BY_FILTER,
    GET_PRODUCTS_REPORT,
    GET_ORDERS_REPORT,
    GET_CUSTOMERS_REPORT,
    SEARCH_PRODUCTS
}from '../reducers/constants'

export const ReportContext = createContext()

const ReportContextProvider = ({ children }) => {
    const [reportState, dispatch] = useReducer(reportReducer, {
		incomeReport: null,
        reportLoading: true,
        incomeReportByFilter: [],
        reportbyFilterLoading: true,
        productsReport: null,
        searchProducts: null,
        productsReportLoading: true,
        ordersReport: null,
        ordersReportLoading: true,
        customersReport: null,
        customersReportLoading: true
	})

    const getIncomeReport = async() => {
        try {
            const response = await axios.get(`${apiUrl}/api/admin/income`)
			if (response.data.success) {
				dispatch({ type: GET_INCOME_REPORT, payload: response.data })
			}
        } catch (error) {
            console.log(error)
        }
    }

    const getIncomeReportByFilter = async(number, type) => {
        reportState.reportbyFilterLoading = true
        try {
            const response = await axios({
                method: 'post',
                url:  `${apiUrl}/api/admin/incomebyfilter`,
                data: {
                  number: number,
                  type: type
                }
            });
            if (response.data.success) {
				dispatch({ type: GET_INCOME_REPORT_BY_FILTER, payload: response.data.result })
			}
        } catch (error) {
            console.log(error)
        }
    }

    const getProductsReport = async() => {
        try {
            const response = await axios.get(`${apiUrl}/api/admin/products`)
            if (response.data.success) {
				dispatch({ type: GET_PRODUCTS_REPORT, payload: response.data.products })
                dispatch({ type: SEARCH_PRODUCTS, payload: response.data.products })
			}
        } catch (error) {
            console.log(error)
            
        }
    }

    const getOrdersReport = async() => {
        try {
            const response = await axios.get(`${apiUrl}/api/admin/orders`)
            if (response.data.success) {
				dispatch({ type: GET_ORDERS_REPORT, payload: response.data.orders })
			}
        } catch (error) {
            console.log(error)
            
        }
    }

    const getCustomersReport = async() => {
        try {
            const response = await axios.get(`${apiUrl}/api/admin/customers`)
            if (response.data.success) {
				dispatch({ type: GET_CUSTOMERS_REPORT, payload: response.data.customers })
			}
        } catch (error) {
            
        }
    }

    const formatVietnamese = (string) => {
        return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D')
    }

    const searchProducts = async(name) => {
        const search = reportState.productsReport.filter(e => formatVietnamese(e.drinkName).toLowerCase().includes(formatVietnamese(name).toLowerCase()))
        dispatch({ type: SEARCH_PRODUCTS, payload: search })
    }

    const updateProduct = async(updatedProduct) => {
        try {
            const response = await axios({
                method: 'post',
                url:  `${apiUrl}/api/admin/updateProduct`,
                data: {
                    updatedProduct
                }
            });
            if(response.data.success) getProductsReport()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getIncomeReport(),
        getIncomeReportByFilter(7, 'DAY'),
        getProductsReport(),
        getOrdersReport(),
        getCustomersReport()
    }, [])

    const reportContextData = {
		reportState,
        getIncomeReport,
        getIncomeReportByFilter,
        getOrdersReport,
        getCustomersReport,
        searchProducts,
        updateProduct
	}

    return (
        <ReportContext.Provider value={ reportContextData }>
            {children}
        </ReportContext.Provider>
    )
}

export default ReportContextProvider
