import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";


const categoryAdapter = createEntityAdapter({
    selectId: (category) => category.id
})

export const categorySlice = createSlice({
    name: 'category',
    initialState: categoryAdapter.getInitialState(),
    reducers: {
        addCategory: categoryAdapter.addOne,
        removeCategory: categoryAdapter.removeOne,
        updateCategory: categoryAdapter.updateOne,
        setListCategory: categoryAdapter.setAll
    }
})

export const categorySelectors = categoryAdapter.getSelectors((state)=>state.category)