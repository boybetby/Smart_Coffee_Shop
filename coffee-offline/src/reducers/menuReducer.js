import React from 'react'
import {
	MENU_LOADED_SUCCESS,
	MENU_LOADED_FAIL,
    FIND_MENU
} from './constants'


const menuReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case MENU_LOADED_SUCCESS: 
            return {
                ...state,
				menu: payload,
				menuLoading: false
            }
        case MENU_LOADED_FAIL:
            return {
                ...state,
                menu: [],
                menuLoading: false
            }
        case FIND_MENU:
            return { ...state, post: payload }
        default:
            return state
    }
}

export default menuReducer