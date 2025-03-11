import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetTournamentDetailWithStatusQuery } from "@/features/api/tournamentApi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home } from "lucide-react";

const TournamentProgress = () => {
  const { tournamentId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetTournamentDetailWithStatusQuery(tournamentId);

  if (isLoading)
    return <h1 className="text-center mt-10 text-xl">Loading Tournament Progress...</h1>;
  if (isError)
    return <h1 className="text-center mt-10 text-red-500">Failed to load progress</h1>;

  const { tournament, enrolled } = data;

  if (!enrolled) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl text-gray-700">You are not enrolled in this tournament.</h2>
        <Button onClick={() => navigate(`/tournament/${tournamentId}`)} className="mt-4 bg-blue-500 hover:bg-blue-600">
          🔙 Go Back to Tournament
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
      <div className="flex justify-between items-center mb-6">
        <Button onClick={() => navigate("/")} className="bg-gray-800 hover:bg-gray-900 text-white flex items-center">
          <Home size={18} className="mr-2" /> Home
        </Button>
      </div>

      <div className="bg-[#1E1E1E] text-white py-10 text-center rounded-lg shadow-md">
        <h1 className="text-3xl md:text-4xl font-extrabold">{tournament?.tournamentTitle}</h1>
        <p className="text-lg opacity-80">{tournament?.subTitle}</p>
      </div>

      <Card className="mt-6 border-green-500">
        <CardContent className="p-6 text-center flex flex-col items-center">
          <CheckCircle size={40} className="text-green-500" />
          <h2 className="text-2xl font-bold mt-2">You are successfully enrolled! </h2>
          <p className="text-md text-gray-700 mt-2">Now you can participate in this tournament! </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TournamentProgress;
