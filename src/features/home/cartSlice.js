import { createSlice } from "@reduxjs/toolkit";

export const CardSlice = createSlice({
    name: "list",
    initialState:{
        articles: []
    },
    reducers:{
        addProduct: (currentState, action) => {
            const listWithNewProduct = [...currentState.articles, action.payload]
            return { ...currentState, articles: listWithNewProduct }
        },
        removeProduct: (currentState, action) => {
            const updatedList = currentState.articles.filter(product => product.id !== action.payload)
            return { ...currentState, articles: updatedList }
        },
        removeFirstProduct: (currentState, action) => {
            const indexToRemove = currentState.articles.findIndex(product => product.id === action.payload)
            if (indexToRemove !== -1) {
                const updatedList = currentState.articles.slice()
                updatedList.splice(indexToRemove, 1)
                return { ...currentState, articles: updatedList }
            }
            return currentState
        }
    }
})