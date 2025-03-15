import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TOURNAMENT_API = "http://localhost:8080/api/v1/tournament";

export const tournamentApi = createApi({
  reducerPath: "tournamentApi",
  tagTypes: ["Refetch_Creator_Tournament", "Refetch_Enrolled_Tournaments"],
  baseQuery: fetchBaseQuery({
    baseUrl: TOURNAMENT_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createTournament: builder.mutation({
      query: ({ tournamentTitle, category }) => ({
        url: "",
        method: "POST",
        body: { tournamentTitle, category },
      }),
      invalidatesTags: ["Refetch_Creator_Tournament"],
    }),

    getSearchTournament: builder.query({
      query: ({ searchQuery, categories, sortByPrice }) => {
        // Build query string
        let queryString = `/search?query=${encodeURIComponent(searchQuery)}`;

        // Append category
        if (categories && categories.length > 0) {
          const categoriesString = categories.map(encodeURIComponent).join(",");
          queryString += `&categories=${categoriesString}`;
        }

        // Append sortByPrice if available
        if (sortByPrice) {
          queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`;
        }

        return {
          url: queryString,
          method: "GET",
        };
      },
    }),


    getPublishedTournament: builder.query({
      query: () => ({ url: "/published-tournaments", method: "GET" }),
    }),

    getCreatorTournament: builder.query({
      query: () => ({ url: "", method: "GET" }),
      providesTags: ["Refetch_Creator_Tournament"],
    }),

    editTournament: builder.mutation({
      query: ({ formData, tournamentId }) => ({
        url: `${tournamentId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Refetch_Creator_Tournament"],
    }),

    deleteTournament: builder.mutation({
      query: (tournamentId) => ({
        url: `/${tournamentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Refetch_Creator_Tournament"],
    }),

    getTournamentById: builder.query({
      query: (tournamentId) => ({
        url: `/${tournamentId}`,
        method: "GET",
      }),
    }),

    publishTournament: builder.mutation({
      query: ({ tournamentId, query }) => ({
        url: `/${tournamentId}?publish=${query}`,
        method: "PATCH",
      }),
    }),

    // ✅ **Enroll in Tournament API**
    enrollInTournament: builder.mutation({
      query: (tournamentId) => ({
        url: `/${tournamentId}/enroll`,
        method: "POST",
      }),
      invalidatesTags: ["Refetch_Enrolled_Tournaments"],
    }),

    // ✅ **Get Enrolled Tournaments**
    getEnrolledTournaments: builder.query({
      query: () => ({
        url: "/enrolled",
        method: "GET",
      }),
      providesTags: ["Refetch_Enrolled_Tournaments"],
    }),

    // ✅ **Get Tournament Detail with Enrollment Status**
    getTournamentDetailWithStatus: builder.query({
      query: (tournamentId) => ({
        url: `/${tournamentId}/detail-with-status`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateTournamentMutation,
  useGetSearchTournamentQuery,
  useGetPublishedTournamentQuery,
  useGetCreatorTournamentQuery,
  useEditTournamentMutation,
  useDeleteTournamentMutation,
  useGetTournamentByIdQuery,
  usePublishTournamentMutation,
  useEnrollInTournamentMutation,
  useGetEnrolledTournamentsQuery,
  useGetTournamentDetailWithStatusQuery,
} = tournamentApi;
