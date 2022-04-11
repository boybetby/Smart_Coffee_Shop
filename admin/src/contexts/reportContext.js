import React, { createContext, useEffect, useReducer } from 'react'
import reportReducer from '../reducers/reportReducer'
import axios from 'axios'
import moment from 'moment'
import {
    apiUrl,
	GET_INCOME_REPORT,
    GET_INCOME_REPORT_BY_FILTER,
    GET_PRODUCTS_REPORT,
    GET_ORDERS_REPORT,
    GET_CUSTOMERS_REPORT,
    GET_USERS_REPORT,
    GET_COUPONS_REPORT,
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
        customersReportLoading: true,
        couponsReport: null,
        couponsReportLoading: true
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

    const getCouponsReport = async() => {
        try {
            const response = await axios.get(`${apiUrl}/api/coupon/`)
            if (response.data.success) {
				dispatch({ type: GET_COUPONS_REPORT, payload: response.data })
			}
        } catch (error) {
            console.log(error)
        }
    }

    const formatVietnamese = (string) => {
        return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D')
    }

    const searchProducts = async(name) => {
        const search = reportState.productsReport.filter(e => formatVietnamese(e.drinkName).toLowerCase().includes(formatVietnamese(name).toLowerCase()))
        dispatch({ type: SEARCH_PRODUCTS, payload: search })
    }

    const createProduct = async(newProduct) => {
        try {
            var formData = new FormData();
            formData.append("defaultPrice", newProduct.defaultPrice);
            formData.append("description", newProduct.description);
            formData.append("category", newProduct.category);
            formData.append("drinkName", newProduct.drinkName);
            formData.append("drinkImage", newProduct.drinkImage);
            const response = await axios({
                method: 'post',
                url:  `${apiUrl}/api/drink/`,
                data: formData
            });
            if(response.data.success) getProductsReport()
        } catch (error) {
            console.log(error)
        }
    }

    const createCoupon = async(newCoupon) => {
        try {
            newCoupon.startDate = moment(newCoupon.startDate).format('YYYY-MM-DDTHH:MM:SS');
            newCoupon.endDate = moment(newCoupon.endDate).format('YYYY-MM-DDTHH:MM:SS');
            console.log(newCoupon)
            const response = await axios({
                method: 'post',
                url:  `${apiUrl}/api/coupon/createCoupon`,
                data: {
                    newCoupon
                }
            });
            if(response.data.success) getCouponsReport()
        } catch (error) {
            console.log(error)
        }
    }

    const getUsersReport = async() => {
        try {
            const response = await axios.get(`${apiUrl}/api/admin/users`)
            if (response.data.success) {
				dispatch({ type: GET_USERS_REPORT, payload: response.data.users })
			}
        } catch (error) {
            console.log(error)
            
        }
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
        getCustomersReport(),
        getUsersReport()
    }, [])

    const reportContextData = {
		reportState,
        getIncomeReport,
        getIncomeReportByFilter,
        getOrdersReport,
        getCustomersReport,
        getCouponsReport,
        searchProducts,
        updateProduct,
        createProduct,
        createCoupon
	}

    return (
        <ReportContext.Provider value={ reportContextData }>
            {children}
        </ReportContext.Provider>
    )
}

export default ReportContextProvider
