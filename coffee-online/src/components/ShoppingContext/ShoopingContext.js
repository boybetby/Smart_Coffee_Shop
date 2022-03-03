import React, { createContext, useState, useEffect } from 'react'
import data from '../../data'
import axios from 'axios'
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from '../../constants/constants'
import setAuthToken from '../LoginForm/setAuthToken'

export const ShoppingContext = createContext(data);

export const ShoppingProvider = props => {
    
    const [productList, setProductList] = useState()
    const [cartProducts, setCartProducts] = useState([])
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [customer, setCustomer] = useState({})
    const [orderType, setOrderType]= useState('DELIVERY')

    useEffect(() => {
        (async () => {
            loadMenu();
            loadUser();
        })()
    }, [])

	// Authenticate user
	const loadUser = async () => {
		if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
			setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
		}

		try {
			const response = await axios.get(`${apiUrl}/api/customer/auth`)
			if (response.data.success) {
				setIsAuthenticated(true)
                setCustomer(response.data.customer)
			}
		} catch (error) {
			localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
			setAuthToken(null)
			setIsAuthenticated(false)
		}
	}


    const loadMenu = async() => {
        try {
            const response = await axios({
                method: 'get',
                url:  `${apiUrl}/api/drink`,          
            });
            setProductList({productList: response.data})
        } catch (error) {
            console.log(error)
        }
    }
    
    let body = (
        <div></div>
    )
    if(productList) {
        body = (
            <ShoppingContext.Provider value={ { productList, cartProducts, setCartProducts, isAuthenticated, setIsAuthenticated, loadUser , customer, setCustomer, orderType, setOrderType } }>
                {props.children}
            </ShoppingContext.Provider>
        )
    }

    return (
        <div>
            {body}
        </div>
    )
}

