import EnrollTournamentButton from "@/components/EnrollTournamentButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { BadgeInfo, CheckCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useGetTournamentDetailWithStatusQuery } from "@/features/api/tournamentApi";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TournamentDetail = () => {
  const { tournamentId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetTournamentDetailWithStatusQuery(tournamentId);

  useEffect(() => {
    if (data?.enrolled) {
      navigate(`/tournament-progress/${tournamentId}`);
    }
  }, [data, navigate, tournamentId]);

  if (isLoading) return <h1 className="text-center mt-10 text-xl">Loading tournament details...</h1>;
  if (isError) return <h1 className="text-center mt-10 text-red-500">Failed to load tournament details</h1>;

  const { tournament, enrolled } = data; 

  return (
    <div className="space-y-10">
      <div className="bg-[#1E1E1E] text-white py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold">{tournament?.tournamentTitle}</h1>
          <p className="mt-2 text-lg opacity-80">{tournament?.subTitle}</p>
          <p className="mt-1 text-sm italic">
            Created By: 
            <span className="text-[#C0C4FC] underline ml-1">{tournament.creator?.name}</span>
          </p>
          <p className="mt-1 text-sm flex items-center justify-center gap-1">
            <BadgeInfo size={16} /> Last updated: {tournament?.createdAt.split("T")[0]}
          </p>
          <p className="mt-2 text-base">📌 Users enrolled: <strong>{tournament?.enrolledUsers.length}</strong></p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-2/3 space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold">About the Tournament</h2>
            <p className="text-gray-700 mt-2" dangerouslySetInnerHTML={{ __html: tournament.description }} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>📜 Tournament Rules & Guidelines</CardTitle>
              <CardDescription>Everything you need to know before you start.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                <li>Follow fair play guidelines.</li>
                <li>Ensure you have registered before the deadline.</li>
                <li>Respect all players and officials.</li>
                <li>Maintain good sportsmanship at all times.</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-6 text-center">
              <h2 className="text-xl font-semibold">💰 Registration Fees</h2>
              <Separator className="my-3" />
              <h3 className="text-lg font-bold text-green-600">₹{tournament.registrationFee}</h3>
            </CardContent>
            <CardFooter className="flex justify-center p-6">
              {enrolled ? (
                <Button onClick={() => navigate(`/tournament-progress/${tournamentId}`)} className="w-full bg-green-500 hover:bg-green-600">
                   Continue Tournament
                </Button>
              ) : (
                <EnrollTournamentButton tournamentId={tournamentId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetail;
