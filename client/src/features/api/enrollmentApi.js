// enrollmentApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ENROLLMENT_API = "http://localhost:8080/api/v1/enrollment"; // Base URL for enrollment-related APIs

export const enrollmentApi = createApi({
  reducerPath: "enrollmentApi",
  tagTypes: ["Refetch_Enrolled_Tournaments"],
  baseQuery: fetchBaseQuery({
    baseUrl: ENROLLMENT_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getEnrolledUsers: builder.query({
      query: () => ({
        url: "/enrollments", // Assumed API endpoint for getting all enrollments
        method: "GET",
      }),
      providesTags: ["Refetch_Enrolled_Tournaments"],
    }),

    getUserDetails: builder.query({
      query: (id) => ({
        url: `/admin/users/${id}`,// Assumed endpoint for fetching user details
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetEnrolledUsersQuery,
  useGetUserDetailsQuery,
} = enrollmentApi;
