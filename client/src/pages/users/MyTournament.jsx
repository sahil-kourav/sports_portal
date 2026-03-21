import React from "react";
import Tournament from "./Tournament";
import { useLoadUserQuery } from "@/features/api/authApi";
import { Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const MyTournamentSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
        <div className="h-36 bg-gray-100" />
        <div className="p-4 space-y-2">
          <div className="h-4 bg-gray-100 rounded w-3/4" />
          <div className="h-3 bg-gray-100 rounded w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

const MyTournament = () => {
  const { data, isLoading } = useLoadUserQuery();
  const navigate = useNavigate();
  const myTournaments = data?.user?.enrolledTournaments || [];

  return (
    <div className="min-h-screen bg-[#f7f6f2] py-12 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Tournaments</h1>
            <p className="text-gray-500 text-sm mt-1">
              View and manage the tournaments you've enrolled in.
              </p>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <MyTournamentSkeleton />
        ) : myTournaments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <Trophy size={24} className="text-gray-300" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">No tournaments yet</h3>
            <p className="text-sm text-gray-400 max-w-xs mb-6">
              You haven't enrolled in any tournaments. Browse available ones and join the competition!
            </p>
            <Button
              onClick={() => navigate("/tournaments")}
              className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
            >
              <Trophy size={15} /> Find Tournaments
            </Button>
          </div>
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