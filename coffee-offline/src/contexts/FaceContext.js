import React, { createContext, useReducer, useState } from 'react'
import faceReducer from '../reducers/faceReducer'
import axios from 'axios'
import moment from 'moment';
import {
    apiUrl,
    token,
	DETECT_FACE,
    DETECT_FACE_FAIL,
    DETECTING,
    GET_CUSTOMER_ORDER
} from '../reducers/constants'

export const FaceContext = createContext()

const FaceContextProvider = ({ children }) => {
    const [faceState, dispatch] = useReducer(faceReducer, {
		customer: null,
        customerOrder: [],
        isDetecting: false
	})

    const [showRegisterModal, setShowRegisterModal] = useState(false)

    const detectFace = async(base64) => {
        dispatch({ type: DETECTING, payload: true })
        const today = moment(Date().toLocaleString()).format("DDMMYYYYHHmm");
        try {
            const response = await axios({
                method: 'post',
                url:  `${apiUrl}/api/customer/detect`,
                headers: {
                    Authorization: token
                },
                data: {
                  base64: base64,
                  name: today
                }
            });
            if (response.data.success) {
                dispatch({ type: DETECT_FACE, payload: response.data })
                dispatch({ type: DETECTING, payload: false })
                getCustomersOrder(response.data.detectedCustomer.orders)
            }
            else {
                dispatch({ type: DETECT_FACE_FAIL })
            }
        } catch (error) {
            console.error(error);
        }
    }

    const getCustomersOrder = async(orderlist) => {
        try {
            const response = await axios({
                method: 'post',
                url:  `${apiUrl}/api/customer/getorder`,
                data: {
                    orderlist: orderlist
                }
            });
            dispatch({ type: GET_CUSTOMER_ORDER, payload: response.data.customerOrder })
        } catch (error) {
            
        }
    }

    const RegisterCustomer = async(id, customer) => {
        try {
            const response = await axios({
                method: 'post',
                url:  `${apiUrl}/api/customer/update`,
                headers: {
                    Authorization: token
                },
                data: {
                  id: id,
                  name: customer.name,
                  phonenumber: customer.phonenumber
                }
            });
            return (response.data)
        } catch (error) {
            
        }
    }

    const faceContextData = {
        faceState,
        detectFace,
        RegisterCustomer,
        showRegisterModal,
        setShowRegisterModal,
        getCustomersOrder
    }

    return (
        <FaceContext.Provider value={ faceContextData }>
            {children}
        </FaceContext.Provider>
    )
}

export default FaceContextProvider