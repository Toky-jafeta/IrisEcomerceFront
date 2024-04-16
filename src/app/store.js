import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { loginSlice } from "../features/workspace/login/loginSlice"
import { api } from "../services/api.service"
import { categorySlice } from "../features/workspace/workspace/list/listStile"
import { articleSlice } from "../features/workspace/workspace/articles/articleSlice"
import { CardSlice } from "../features/home/cartSlice"
import { ClientSlice } from "../features/client/clientSlice"

export const store = configureStore({
    reducer: combineReducers({
        auth: loginSlice.reducer,
        list: CardSlice.reducer,
        category: categorySlice.reducer,
        article: articleSlice.reducer,
        clients: ClientSlice.reducer,
        [api.reducerPath]: api.reducer
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})