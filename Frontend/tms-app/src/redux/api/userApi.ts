import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserProfileSchema } from '../../Schemas/UserProfileSchema';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5068/api/' }),
  endpoints: (builder) => ({
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

export const { useGetUserProfileQuery, useSetUserProfileMutation } = userApi;
