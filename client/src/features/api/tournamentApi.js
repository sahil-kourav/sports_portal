import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TOURNAMENT_API = "http://localhost:8080/api/v1/tournament";

export const tournamentApi = createApi({
  reducerPath: "tournamentApi",
  tagTypes: ["Refetch_Creator_tournament"],
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
    getSearchTournament:builder.query({
      query: ({searchQuery, categories, sortByPrice}) => {
        // Build qiery string
        let queryString = `/search?query=${encodeURIComponent(searchQuery)}`

        // append cateogry 
        if(categories && categories.length > 0) {
          const categoriesString = categories.map(encodeURIComponent).join(",");
          queryString += `&categories=${categoriesString}`; 
        }

        // Append sortByPrice is available
        if(sortByPrice){
          queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`; 
        }

        return {
          url:queryString,
          method:"GET", 
        }
      }
    }),
    getPublishedTournament: builder.query({
      query: () => ({
        url: "/published-tournaments",
        method: "GET",
      }),
    }),
    getCreatorTournament: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_Tournament"],
    }),
    editTournament: builder.mutation({
      query: ({ formData, tournamentId }) => ({
        url: `/${tournamentId}`,
        method: "PUT",
        body: formData,
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
  }),
});
export const {
  useCreateTournamentMutation,
  useGetSearchTournamentQuery,
  useGetPublishedTournamentQuery,
  useGetCreatorTournamentQuery,
  useEditTournamentMutation,
  useGetTournamentByIdQuery,
  usePublishTournamentMutation,
} = tournamentApi;
