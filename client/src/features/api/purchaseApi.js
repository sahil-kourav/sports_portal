import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TOURNAMENT_PURCHASE_API = "http://localhost:8080/api/v1/purchase";

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: TOURNAMENT_PURCHASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // 🟢 1️⃣ CREATE ORDER
    createOrder: builder.mutation({
      query: (tournamentId) => ({
        url: "/checkout/create-order",
        method: "POST",
        body: { tournamentId },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          window.location.href = data.success_url; // ✅ Redirect to success page
        } catch (error) {
          window.location.href = "http://localhost:5173/tournament-detail"; // ❌ Redirect to cancel page
        }
      },
    }),

    // 🔵 2️⃣ GET TOURNAMENT DETAILS + PURCHASE STATUS
    getTournamentDetailWithStatus: builder.query({
      query: (tournamentId) => ({
        url: `/tournament/${tournamentId}/detail-with-status`,
        method: "GET",
      }),
    }),

    // 🟡 3️⃣ GET ALL PURCHASED TOURNAMENTS
    getPurchasedTournaments: builder.query({
      query: () => ({
        url: `/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetTournamentDetailWithStatusQuery,
  useGetPurchasedTournamentsQuery
} = purchaseApi;
