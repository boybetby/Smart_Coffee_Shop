import React, { createContext, useEffect, useReducer } from 'react'
import reportReducer from '../reducers/reportReducer'
import axios from 'axios'
import {
    apiUrl,
	GET_INCOME_REPORT,
    GET_INCOME_REPORT_BY_FILTER
}from '../reducers/constants'

export const ReportContext = createContext()

const ReportContextProvider = ({ children }) => {
    const [reportState, dispatch] = useReducer(reportReducer, {
		incomeReport: null,
        reportLoading: true,
        incomeReportByFilter: [],
        reportbyFilterLoading: true
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

    useEffect(() => {
        getIncomeReport(),
        getIncomeReportByFilter(7, 'DAY')
    }, [])

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

    const reportContextData = {
		reportState,
        getIncomeReport,
        getIncomeReportByFilter
	}

    return (
        <ReportContext.Provider value={ reportContextData }>
            {children}
        </ReportContext.Provider>
    )
}

export default ReportContextProvider
