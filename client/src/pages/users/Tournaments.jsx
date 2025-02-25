import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Tournament from "./Tournament";

const listOfTournaments = [1, 2, 3, 4,5,6];

const Tournaments = () => {
  const isLoading = false;

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 min-h-screen py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
          🏆 Premier Tournaments
        </h2>
        <p className="text-md sm:text-lg text-gray-700 max-w-3xl mx-auto mb-12">
          Explore top-tier tournaments spanning local, national, and international levels. Elevate your game with the best.
        </p>

        {/* Tournament Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => <TournamentSkeleton key={index} />)
            : listOfTournaments.map((tournament, index) => <Tournament key={index} />)}
        </div>
      </div>
    </section>
  );
};

export default Tournaments;

const TournamentSkeleton = () => {
  return (
    <div className="relative bg-white/30 backdrop-blur-xl shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full max-w-[350px] min-h-[500px] mx-auto flex flex-col">
      <Skeleton className="w-full h-52 sm:h-60 bg-gray-400 rounded-lg" />
      <div className="p-4 sm:p-6 space-y-5 flex-1">
        <Skeleton className="h-6 sm:h-7 w-4/5 bg-gray-500 rounded-md" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 sm:h-12 w-10 sm:w-12 rounded-full bg-gray-500" />
            <Skeleton className="h-5 sm:h-6 w-28 sm:w-32 bg-gray-500 rounded-md" />
          </div>
          <Skeleton className="h-4 sm:h-5 w-20 sm:w-24 bg-gray-500 rounded-md" />
        </div>
        <Skeleton className="h-4 sm:h-5 w-1/3 bg-gray-500 rounded-md" />
      </div>
    </div>
  );
};
