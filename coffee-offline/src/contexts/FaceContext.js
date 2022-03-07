import React, { Children, createContext, useReducer } from 'react'
import faceReducer from '../reducers/faceReducer'
import axios from 'axios'
import moment from 'moment';
import {
    apiUrl,
    token,
	DETECT_FACE,
    DETECT_FACE_FAIL
} from '../reducers/constants'

export const FaceContext = createContext()

const FaceContextProvider = ({ children }) => {
    const [faceState, dispatch] = useReducer(faceReducer, {
		customer: null,
        isDetecting: true
	})

    const detectFace = async(base64) => {
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
            }
            else {
                dispatch({ type: DETECT_FACE_FAIL })
            }
        } catch (error) {
            console.error(error);
        }
    }

    const faceContextData = {
        faceState,
        detectFace
    }

    return (
        <FaceContext.Provider value={ faceContextData }>
            {children}
        </FaceContext.Provider>
    )
}

export default FaceContextProvider