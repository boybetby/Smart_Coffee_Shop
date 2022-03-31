import {
	SET_AUTH
} from './constants'


const authReducer = (state, action) => {
    const { type, payload: { user, isAuthenticated } } = action;
    switch (type) {
        case SET_AUTH: 
            return {
                ...state,
                authLoading: false,
				user,
                isAuthenticated
            }
        default:
            return state
    }
}

export default authReducer