import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TaskDetails } from '../types/TaskState.type';
import { UserProfileSchema } from '../../Schemas/UserProfileSchema';
import { API_BASE_URL } from '../../config/apiConfig';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl:API_BASE_URL }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: 'account/register',
        method: 'POST',
        body: user,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: 'account/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    fetchUser: builder.query({
      query: () => 'account/me',
    }),
    getTasksByUsername: builder.query<TaskDetails[], string>({
        query: (username) => `tasks/user/${username}`,
      }),
      getUserProfile: builder.query<UserProfileSchema, string>({
        query: (userId) => `profile/user/${userId}`,
      }),
      setUserProfile: builder.mutation<UserProfileSchema, Partial<UserProfileSchema> & { userId: string }>({
        query: ({ userId, ...patch }) => ({
          url: `profile/${userId}`,
          method: 'PUT',
          body: patch,
        }),
  }),
}),
});

export const { useRegisterUserMutation, useLoginUserMutation, useFetchUserQuery,  useGetTasksByUsernameQuery,useGetUserProfileQuery, useSetUserProfileMutation} = apiSlice;
