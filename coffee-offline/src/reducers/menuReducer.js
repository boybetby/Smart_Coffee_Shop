import {
	MENU_LOADED_SUCCESS,
	MENU_LOADED_FAIL,
    FIND_MENU,
    ADD_ORDER,
    UPDATE_ORDER
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
            return { ...state, drink: payload }
        case ADD_ORDER:
            return { 
                ...state,
                order: [ ...state.order, payload ]
            }
        case UPDATE_ORDER:
            return {
                ...state,
                order: [ ...state.order ]
            }    
        default:
            return state
    }
}

export default menuReducer