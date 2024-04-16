import { createSlice } from "@reduxjs/toolkit";


const getInitialState = () => {
    return JSON.parse(window.localStorage.getItem("authData")  || '{}');
}

export const loginSlice = createSlice({
    name: 'auth',
    initialState: getInitialState(),
    reducers: {
        loginSuccess: (currentState, action) => {
            const payload = {...action.payload}
            payload.isAuthenticated = true
            localStorage.setItem('authData', JSON.stringify(payload))
            return {...currentState, ...payload}
        },
        loginError: (currentState, action) => {
            return {...currentState, ...action.payload}
        },
        logout: () => {
            localStorage.removeItem('authData')
            return {}
        }

    }
})