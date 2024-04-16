import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";


const clientAdapter = createEntityAdapter({
    selectId: (client) => client.id
})

export const ClientSlice = createSlice({
    name: 'clients',
    initialState: clientAdapter.getInitialState(),
    reducers:{
        addClient: clientAdapter.addOne,
    }
})

export const clientSelectors = clientAdapter.getSelectors((state) => state.clients)