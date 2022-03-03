import React, { createContext, useReducer, useState } from 'react'
import menuReducer from '../reducers/menuReducer'
import axios from 'axios'
import {
	apiUrl,
	MENU_LOADED_SUCCESS,
	MENU_LOADED_FAIL,
    FIND_MENU,
	ADD_ORDER,
	UPDATE_ORDER
}from '../reducers/constants'

export const MenuContext = createContext()

const MenuContextProvider = ({ children }) => {
    const [menuState, dispatch] = useReducer(menuReducer, {
		drink: null,
		menu: [],
		order: [],
		menuLoading: true
	})

    const getMenu = async () => {
		try {
			const response = await axios.get(`${apiUrl}/api/drink`)
			if (response.data.success) {
				dispatch({ type: MENU_LOADED_SUCCESS, payload: response.data.drinks })
			}
		} catch (error) {
			dispatch({ type: MENU_LOADED_FAIL })
		}
	}

    const findMenu = drinkName => {
		const drink = menuState.menu.find(drink => drink.drinkName === drinkName)
		dispatch({ type: FIND_MENU, payload: drink })
	}

	const addOrder = drink => {
		let order = menuState.order.find(item => item._id === drink._id)
		if(!order){
			drink.quantity = 1
			dispatch({ type: ADD_ORDER, payload: drink })
		}
		else {
			order.quantity++
			dispatch({ type: UPDATE_ORDER })
		}
	}

    const menuContextData = {
		menuState,
        getMenu,
        findMenu,
		addOrder
	}

    return (
        <MenuContext.Provider value={ menuContextData }>
            {children}
        </MenuContext.Provider>
    )
}

export default MenuContextProvider