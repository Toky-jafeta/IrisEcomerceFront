import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const api = createApi({
    reducerPath: 'ecommerceApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/v1/",
        prepareHeaders: (headers, { getState, endpoint }) => {
            if (endpoint !== "getAllArticle" && endpoint !== "getMinimalPrice" && endpoint !== "createClient" && endpoint !== "getClient" && endpoint!=="createCart"){
                
                const token = getState().auth.access_token;

                if (token) {
                        headers.set('authorization', `Bearer ${token}`);
                        headers.set('Accept', 'application/json');
                }
                return headers;  
            }
        },
    }),
    provideTags: ['article'],
    endpoints: (builder) => ({
        getCategoryList: builder.query({
            query: () => `category/`,
            providesTags: ['article']
        }),
        createArticle: builder.mutation({
            query: ({data}) => ({
                url: `articles/`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['article']
        }),
        getAllArticle: builder.query({
            query: () => `articles/`,
            providesTags: ['article'],
        }),
        getArticle: builder.query({
            query: ({articleId}) => `articles/${articleId}/`,
            providesTags: ['article']
        }),
        updateArticle: builder.mutation({
            query: ({ articleId, data }) => {
                const hasArticlePictures = data.article_pictures && data.article_pictures
                let bodyData = data
                if (hasArticlePictures) {
                    const formData = new FormData();
                    hasArticlePictures.forEach(element => {
                        formData.append('article_pictures', element)
                    })
                    console.log(formData)
                    bodyData = formData
                }
                return ({
                    url: `articles/${articleId}/`,
                    method: 'PATCH',
                    body: bodyData
                });
            },
            invalidatesTags: ['article']
        }),
        deleteArticle: builder.mutation({
            query: ({articleId}) => ({
                url: `articles/${articleId}/`,
                method: 'DELETE'
            }),
            invalidatesTags: ['article']
        }),
        getMinimalPrice: builder.query({
            query: ({article_id}) => ({
                url: `articles/minimal_price/`,
                method: 'POST',
                body:{article_id}
            }),
        }),
        updateVariant: builder.mutation({
            query: ({articleId, data}) => ({
                url: `articles/${articleId}/variants/update_or_create_variants/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['article']
        }),
        createClient: builder.mutation({
            query: ({data}) => ({
                url: `client/`,
                method: 'POST',
                body: data
            })
        }),
        getClient: builder.query({
            query: (client_id) => ({
                url: `client/${client_id}/`
            })
        }),
        createCart: builder.mutation({
            query: ({data}) => ({
                url: `cart/`,
                method: 'POST',
                body: data
            })
        }),
        createCartItem: builder.mutation({
            query: ({data}) => ({
                url: `cartItem/`,
                method: `POST`,
                body: data
            })
        }),
        createCartItemUpdate: builder.mutation({
            query: ({data, cartItem}) => ({
                url: `cartItem/${cartItem}/`,
                method: `PATCH`,
                body: data
            })
        })

    }),
})

export const { useGetCategoryListQuery, 
    useGetAllArticleQuery, useCreateArticleMutation, 
    useGetArticleQuery, useGetMinimalPriceQuery,
    useDeleteArticleMutation,
    useUpdateArticleMutation, useUpdateVariantMutation,
    useCreateClientMutation, useGetClientQuery, useCreateCartMutation,
    useCreateCartItemMutation, useCreateCartItemUpdateMutation
} = api