import React from "react";
import Tournament from "./Tournament";
import { useLoadUserQuery } from "@/features/api/authApi";

const MyTournament = () => { 
  const { data, isLoading } = useLoadUserQuery(); // ✅ API call pehle kar rahe hain
  const user = data?.user; // ✅ Safe access
  
  const myTournaments = data.user?.enrolledTournaments || []; // ✅ FIX: Corrected the path

  return (
    <div className="max-w-4xl mx-auto my-10 px-4 md:px-0">
      <h1 className="font-bold text-2xl">🏆 My Tournaments</h1>

      <div className="mt-5">
        {isLoading ? (
          <MyTournamentSkeleton />
        ) : myTournaments.length === 0 ? (
          <p className="text-red-500 text-lg">You haven't enrolled in any tournaments yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {myTournaments.map((tournament) => (
              <Tournament key={tournament._id} tournament={tournament} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTournament;

// ✅ Skeleton Component for Loading State
const MyTournamentSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);
