import React, { createContext, useReducer, useState } from 'react'
import { menuReducer } from '../reducers/menuReducer'
import axios from 'axios'
import {
	apiUrl,
	MENU_LOADED_SUCCESS,
	MENU_LOADED_FAIL,
    FIND_MENU
}from '../reducers/constants'

export const MenuContext = createContext()

const MenuContextProvider = ({ children }) => {
    const [menuState, dispatch] = useReducer(menuReducer, {
		drink: null,
		menu: [],
		postsLoading: true
	})

    const getMenu = async () => {
		try {
			const response = await axios.get(`${apiUrl}/api/drinks/`)
			if (response.data.success) {
				dispatch({ type: MENU_LOADED_SUCCESS, payload: response.data.classes })
			}
		} catch (error) {
			dispatch({ type: MENU_LOADED_FAIL })
		}
	}

    const findMenu = drinkName => {
		const drink = menuState.menu.find(drink => drink._id === drinkName)
		dispatch({ type: FIND_MENU, payload: drink })
	}

    const menuContextData = {
		menuState,
        getMenu,
        findMenu
	}

    return (
        <MenuContextProvider value={menuContextData}>
            {children}
        </MenuContextProvider>
    )
}

export default MenuContextProvider