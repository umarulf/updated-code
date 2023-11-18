import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
 
 
const baseURI = 'http://localhost:8080';
 
export const apiSlice = createApi({
    baseQuery : fetchBaseQuery({ baseUrl : baseURI}),
    endpoints : builder => ({
        getCategories : builder.query({
            query: () => '/v1/category',
            providesTags: ['categories']
        }),
 
        getLabels : builder.query({
            query : () => '/v1/transaction/labels',
            providesTags: ['transaction']
        }),
 
        addTransaction : builder.mutation({
            query : (initialTransaction) => ({
                url: '/v1/transaction',
                method: "POST",
                body: initialTransaction
            }),
            invalidatesTags: ['transaction']
        }),
 
        deleteTransaction : builder.mutation({
            query : recordId => ({
                url : `/v1/transaction/${recordId}`,
                method : "DELETE",
            }),
            invalidatesTags: ['transaction']
        })
 
    })
})
 
export default apiSlice;