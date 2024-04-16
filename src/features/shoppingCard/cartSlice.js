import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const cartAdapter = createEntityAdapter({
    selectId: (cart) => cart.id
})

export const CartSlice = createSlice({
    name: 'cart',
    initialState: cartAdapter.getInitialState(),
    reducers:{
        addCart: cartAdapter.addOne,
    }
})

export const cartSelector = cartAdapter.getSelectors((state) => state.clients)