import { createSlice } from '@reduxjs/toolkit';

export const articleSlice = createSlice({
    name: 'article',
    initialState: {},
    reducers: {
        setArticle(state, action) {
            state[action.payload.id] = action.payload;
        },
    },
})