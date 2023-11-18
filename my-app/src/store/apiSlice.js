import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURI = 'http://localhost:8080';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  endpoints: (builder) => ({
    // Get categories endpoint
    getCategories: builder.query({
      query: () => {
        const userId = localStorage.getItem('userId');

        if (!userId) {
          console.error('User ID not found in local storage.');
          return;
        }

        return `/v1/category?userId=${userId}`;
      },
      providesTags: ['categories'],
    }),

    // Get labels endpoint
    getLabels: builder.query({
      query: () => {
        const userId = localStorage.getItem('userId');

        if (!userId) {
          console.error('User ID not found in local storage.');
          return;
        }

        return `/v1/transaction/labels?userId=${userId}`;
      },
      providesTags: ['transaction'],
    }),

    // Add transaction endpoint
    addTransaction: builder.mutation({
      query: (transactionData) => {
        const userId = localStorage.getItem('userId');

        if (!userId) {
          console.error('User ID not found in local storage.');
          return;
        }

        return {
          url: `/v1/transaction?userId=${userId}`,
          method: 'POST',
          body: transactionData,
        };
      },
      invalidatesTags: ['transaction'],
    }),

    // Delete transaction endpoint
    deleteTransaction: builder.mutation({
      query: (recordId) => {
        const userId = localStorage.getItem('userId');

        if (!userId) {
          console.error('User ID not found in local storage.');
          return;
        }

        return {
          url: `/v1/transaction/${recordId}?userId=${userId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['transaction'],
    }),

    // ... (other endpoints)
  }),
});

export default apiSlice;
