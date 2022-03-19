import React, { createContext, useEffect, useReducer } from 'react'
import reportReducer from '../reducers/reportReducer'
import axios from 'axios'
import {
    apiUrl,
	GET_INCOME_REPORT
}from '../reducers/constants'

export const ReportContext = createContext()

const ReportContextProvider = ({ children }) => {
    const [reportState, dispatch] = useReducer(reportReducer, {
		incomeReport: null,
        reportLoading: true
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
        getIncomeReport()
    }, [])

    const reportContextData = {
		reportState,
        getIncomeReport
	}

    return (
        <ReportContext.Provider value={ reportContextData }>
            {children}
        </ReportContext.Provider>
    )
}

export default ReportContextProvider
