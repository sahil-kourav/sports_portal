import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetTournamentDetailWithStatusQuery } from "@/features/api/tournamentApi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, Calendar, MapPin, Trophy } from "lucide-react";

const TournamentProgress = () => {
  const { tournamentId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetTournamentDetailWithStatusQuery(tournamentId);

  if (isLoading)
    return <h1 className="text-center mt-10 text-xl animate-pulse">Loading Tournament Progress...</h1>;
  if (isError)
    return <h1 className="text-center mt-10 text-red-500">Failed to load progress</h1>;

  const { tournament, enrolled } = data;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; 
  
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0"); 
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`; 
  };

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-8 py-12">
      <Card className="border border-gray-200 shadow-md rounded-lg p-6">
        <CardContent className="text-center flex flex-col items-center">
          <CheckCircle size={50} className="text-green-500 mb-3" />
          <h2 className="text-2xl font-bold text-gray-800">You are successfully enrolled!</h2>
          <p className="text-md mt-2">
            Congratulations! You are now officially part of the <span className="font-semibold">{tournament?.tournamentTitle}</span>. Get ready to compete and give your best performance!
          </p>
        </CardContent>
      </Card>

      {/* Tournament Details */}
      <div className="mt-8 bg-white border border-gray-200 shadow-md rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-4">Tournament Details</h3>
        <div className="space-y-2">
          <p className="flex items-center font-semibold gap-2">{tournament?.tournamentTitle}</p>
          <p
            className="text-md leading-relaxed text-gray-900"
            dangerouslySetInnerHTML={{ __html: tournament?.description || "<i>No description available</i>" }}
          />
          <p className="flex items-center gap-2"><Calendar className="text-gray-900" size={18} /> <span className="font-semibold">Starting Date:</span> {formatDate(tournament?.startDate)}</p>
          <p className="flex items-center gap-2"><Calendar className="text-gray-900" size={18} /> <span className="font-semibold">Ending Date:</span> {formatDate(tournament?.endDate)}</p>
          <p className="flex items-center gap-2"><MapPin className="text-gray-900" size={18} /> <span className="font-semibold">Location:</span> {tournament?.location || "Not specified"}</p>
          <p className="flex items-center gap-2"><Trophy className="text-gray-900" size={18} /> <span className="font-semibold">Total Teams:</span> {tournament?.maxTeams}</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center items-center mt-10">
        <Button
          onClick={() => navigate("/")}
          className="bg-gray-800 hover:bg-gray-900 text-white flex items-center font-semibold px-5 py-2 rounded-lg"
        >
          <Home size={18} className="mr-2" /> Go to Home Page
        </Button>
      </div>
    </div>
  );
};

export default TournamentProgress;