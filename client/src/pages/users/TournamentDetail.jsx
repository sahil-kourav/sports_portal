import BuyTournamentButton from "@/components/BuyTournamentButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BadgeInfo } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useGetTournamentDetailWithStatusQuery } from "@/features/api/purchaseApi";
// import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
// import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

const TournamentDetail = () => {
  const params = useParams();
  const tournamentId = params.tournamentId;
  const navigate = useNavigate();
  const { data, isLoading, isError } =
    useGetTournamentDetailWithStatusQuery(tournamentId);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h>Failed to load tournament details</h>;

  const { tournament, purchased } = data;
  console.log(purchased);

  const handleContinueTournament = () => {
    if (purchased) {
      navigate(`/tournament-progress/${tournamentId}`)
    }
  }

  return (
    <div className="space-y-5">
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">
            {tournament?.tournamentTitle}
          </h1>
          <p className="text-base md:text-lg">{tournament?.subTitle} </p>
          <p>
            Created By{" "}
            <span className="text-[#C0C4FC] underline italic">
              {tournament.creator?.name}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated</p>
            {tournament?.createdAt.split("T")[0]}
          </div>
          <p>Users enrolled: {tournament?.enrolledUsers.length} </p>

        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">About the Tournament</h1>
          <p
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: tournament.description }}
          />
         

          <Card>
            <CardHeader>
              <CardTitle>Tournament Content</CardTitle>
              <CardDescription>Rules</CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <h1>Tournament title</h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">Registration Fees: {tournament.registrationFee}</h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchased ? (
                <Button onClick={handleContinueTournament} className="w-full">Continue tournament</Button>
              ) : (
                <BuyTournamentButton tournamentId={tournamentId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetail;






// import BuyTournamentButton from "@/components/BuyTournamentButton";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// // import { Separator } from "@/components/ui/separator";
// import { useGetTournamentDetailWithStatusQuery } from "@/features/api/purchaseApi";
// import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
// import React from "react";
// import ReactPlayer from "react-player";
// import { useNavigate, useParams } from "react-router-dom";

// const TournamentDetail = () => {
//   const params = useParams();
//   const tournamentId = params.tournamentId;
//   const navigate = useNavigate();
//   const { data, isLoading, isError } =
//     useGetTournamentDetailWithStatusQuery(tournamentId);

//   if (isLoading) return <h1>Loading...</h1>;
//   if (isError) return <h>Failed to load tournament details</h>;

//   const { tournament, purchased } = data;
//   console.log(purchased);

//   const handleContinueTournament = () => {
//     if(purchased){
//       navigate(`/tournament-progress/${tournamentId}`)
//     }
//   }

//   return (
//     <div className="space-y-5">
//       <div className="bg-[#2D2F31] text-white">
//         <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
//           <h1 className="font-bold text-2xl md:text-3xl">
//             {/* {tournament?.tournamentTitle} */} Tournament Title
//           </h1>
//           <p className="text-base md:text-lg">Tournament Sub-title</p>
//           <p>
//             Created By{" "}
//             <span className="text-[#C0C4FC] underline italic">
//               {tournament?.creator.name}
//             </span>
//           </p>
//           <div className="flex items-center gap-2 text-sm">
//             <BadgeInfo size={16} />
//             <p>Last updated {tournament?.createdAt.split("T")[0]}</p>
//           </div>
//           <p>Players enrolled: </p>
//         </div>
//       </div>
//       <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
//         <div className="w-full lg:w-1/2 space-y-5">
//           <h1 className="font-bold text-xl md:text-2xl">Description</h1>
//           <p
//             className="text-sm"
//             dangerouslySetInnerHTML={{ __html: tournament.description }}
//           />
//           <Card>
//             <CardHeader>
//               <CardTitle>Tournament Content</CardTitle>
//               <CardDescription>4 matches</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               {tournament.matches.map((match, idx) => (
//                 <div key={idx} className="flex items-center gap-3 text-sm">
//                   <span>
//                     {true ? <PlayCircle size={14} /> : <Lock size={14} />}
//                   </span>
//                   <p>{match.matchTitle}</p>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         </div>
//         <div className="w-full lg:w-1/3">
//           <Card>
//             <CardContent className="p-4 flex flex-col">
//               <div className="w-full aspect-video mb-4">
//                 <ReactPlayer
//                   width="100%"
//                   height={"100%"}
//                   url={tournament.matches[0].videoUrl}
//                   controls={true}
//                 />
//               </div>
//               <h1>Match title</h1>
//               <Separator className="my-2" />
//               <h1 className="text-lg md:text-xl font-semibold">Tournament Price</h1>
//             </CardContent>
//             <CardFooter className="flex justify-center p-4">
//               {purchased ? (
//                 <Button onClick={handleContinueTournament} className="w-full">Continue Tournament</Button>
//               ) : (
//                 <BuyTournamentButton tournamentId={tournamentId} />
//               )}
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TournamentDetail;
