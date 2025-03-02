import React from "react";
import Tournament from "./Tournament";
import { useLoadUserQuery } from "@/features/api/authApi";

const MyTournament = () => { 
  const {data, isLoading} = useLoadUserQuery();

  const myTournament = data?.user.enrolledTournaments || [];
  return (
    <div className="max-w-4xl mx-auto my-10 px-4 md:px-0">
      <h1 className="font-bold text-2xl">My Tournament</h1>
      <div className="my-5">
        {isLoading ? (
          <MyTournamentSkeleton />
        ) : myTournament.length === 0 ? (
          <p>You are not enrolled in any tournament.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {myTournament.map((tournament, index) => (
              <Tournament key={index} tournament={tournament}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTournament;

// Skeleton component for loading state
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
