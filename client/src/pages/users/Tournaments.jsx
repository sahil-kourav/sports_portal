import React from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import Tournament from "./Tournament";
import { useGetPublishedTournamentQuery } from "@/features/api/tournamentApi";
import CallToAction from "./CallToAction";

const Tournaments = () => {
  const { data, isLoading, isError } = useGetPublishedTournamentQuery();
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-b from-white via-gray-50 to-white min-h-screen py-16 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-4xl sm:text-4xl font-bold text-gray-800 mb-6 tracking-tight">
          Compete at Every Level
        </h2>

        <p className="max-w-3xl mx-auto text-gray-500 text-base sm:text-lg mb-14">
          Compete in top-tier tournaments across local, national, and
          international levels. Rise to the challenge and showcase your skills!
        </p>

        {/* Tournament Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <TournamentSkeleton key={index} />
              ))
            : data?.tournaments &&
              data.tournaments.slice(0, 8).map((tournament, index) => (
                <div className="transform transition duration-300 group-hover:-translate-y-1">
                  <Tournament key={index} tournament={tournament} />
                </div>
              ))}
        </div>

        <button
          onClick={() => navigate(`/tournament/search?query`)}
          className="px-8 py-3 rounded-md text-gray-700 border border-gray-300 hover:bg-gray-100 hover:shadow-md transition-all duration-300"
        >
          Show all tournaments
        </button>

        {/* Call To Action */}
        <div className="mt-20">
          <CallToAction />
        </div>
      </div>
    </section>
  );
};

export default Tournaments;

const TournamentSkeleton = () => {
  return (
    <div className="relative bg-white shadow-md hover:shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 w-full max-w-[350px] min-h-[500px] mx-auto flex flex-col border border-gray-100">
      <Skeleton className="w-full h-52 sm:h-56 bg-gray-200 rounded-t-2xl" />
      <div className="p-6 space-y-5 flex-1">
        <Skeleton className="h-6 w-4/5 bg-gray-300 rounded-md" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full bg-gray-300" />
            <Skeleton className="h-5 w-28 bg-gray-300 rounded-md" />
          </div>
          <Skeleton className="h-4 w-20 bg-gray-300 rounded-md" />
        </div>
        <Skeleton className="h-4 w-1/3 bg-gray-300 rounded-md" />
      </div>
    </div>
  );
};
