import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com/",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({page, limit}) => `search/users?q=type%3Auser&since=${page}&per_page=${limit}`,
    }),
    getSingleUser : builder.query({
      query: (username) => `users/${username}`
    })
  }),
});

export const { useLazyGetUsersQuery, useLazyGetSingleUserQuery } = usersApi;
