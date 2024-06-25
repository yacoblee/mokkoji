import { createStore } from 'redux';

const initialState = {
    isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.payload
            };
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
            };
        default:
            return state;
    }
};

const store = createStore(reducer);

export default store;