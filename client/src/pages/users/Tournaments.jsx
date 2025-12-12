// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Skeleton } from "@/components/ui/skeleton";
// import Tournament from "./Tournament";
// import { useGetPublishedTournamentQuery } from "@/features/api/tournamentApi";
// import CallToAction from "./CallToAction";

// const Tournaments = () => {
// const { data, isLoading, isError } = useGetPublishedTournamentQuery();
// const navigate = useNavigate();

// // if (isError) return <h1>Some error occurred while fetching tournaments.</h1>;


//   return (
//     <section className="bg-gradient-to-b from-white to-gray-50 min-h-screen py-16 px-4 sm:px-8">
//       <div className="max-w-6xl mx-auto text-center">
//         <h2 className="text-gray-800 font-semibold text-4xl sm:text-3xl mb-8">
//         Compete at Every Level 
//         </h2>

//         <p className="max-w-4xl mx-auto text-base sm:text-lg text-gray-500 mb-16">
//         Compete in top-tier tournaments across local, national, and international levels. Rise to the challenge and showcase your skills!     
//            </p>

//         {/* Tournament Grid */}
//              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-12 gap-6">
//            {isLoading ? (
//              Array.from({ length: 4 }).map((_, index) => (
//                <TournamentSkeleton key={index} />
//              ))
//            ) : (
//             data?.tournaments && data.tournaments.slice(0, 4).map((tournament, index) => <Tournament key={index} tournament={tournament}/>) 
//            )}
//          </div>
//            <button
//                 onClick={() => navigate(`/tournament/search?query`)}
//                 className="text-gray-500 border border-gray-500/30 px-10 py-3"
//             >
//                 Show all tournaments
//             </button> 
   
//          {/* CallToAction Call  */}
//          <CallToAction />
//       </div>
//     </section>
//   );
// };

// export default Tournaments;

// const TournamentSkeleton = () => {
//   return (
//     <div className="relative bg-white/30 backdrop-blur-xl shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full max-w-[350px] min-h-[500px] mx-auto flex flex-col">
//       <Skeleton className="w-full h-52 sm:h-60 bg-gray-400 rounded-lg" />
//       <div className="p-4 sm:p-6 space-y-5 flex-1">
//         <Skeleton className="h-6 sm:h-7 w-4/5 bg-gray-500 rounded-md" />
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <Skeleton className="h-10 sm:h-12 w-10 sm:w-12 rounded-full bg-gray-500" />
//             <Skeleton className="h-5 sm:h-6 w-28 sm:w-32 bg-gray-500 rounded-md" />
//           </div>
//           <Skeleton className="h-4 sm:h-5 w-20 sm:w-24 bg-gray-500 rounded-md" />
//         </div>
//         <Skeleton className="h-4 sm:h-5 w-1/3 bg-gray-500 rounded-md" />
//       </div>
//     </div>
//   );
// };










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
      <div className="max-w-7xl mx-auto text-center">
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
              data.tournaments
                .slice(0, 4)
                .map((tournament, index) => (
                  <Tournament key={index} tournament={tournament} />
                ))}
        </div>

        <button
          onClick={() => navigate(`/tournament/search?query`)}
          className="px-8 py-3 rounded-full text-gray-700 border border-gray-300 hover:bg-gray-100 hover:shadow-md transition-all duration-300"
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
