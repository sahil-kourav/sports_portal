import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Tournament from "./Tournament";
import { useGetPublishedTournamentQuery } from "@/features/api/tournamentApi";

const Tournaments = () => {
  const {data, isLoading, isSuccess, isError} = useGetPublishedTournamentQuery();
console.log(data);
  if(isError) return <h1>Some error occurred while fetching tournaments.</h1>


  return (
    <section className="bg-gradient-to-b from-white to-gray-50 min-h-screen py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-gray-700 text-4xl sm:text-3xl mb-8 font-serif">
        Compete at Every Level 
        </h2>

        <p className="max-w-4xl mx-auto text-base sm:text-lg text-gray-500 mb-16">
        Compete in top-tier tournaments across local, national, and international levels. Rise to the challenge and showcase your skills!     
           </p>

        {/* Tournament Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {isLoading ? (
             Array.from({ length: 8 }).map((_, index) => (
               <TournamentSkeleton key={index} />
             ))
           ) : (
            data?.tournaments && data.tournaments.map((tournament, index) => <Tournament key={index} tournament={tournament}/>) 
           )}
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







// import { Skeleton } from "@/components/ui/skeleton";
// import React from "react";
// import Tournament from "./Tournament";
// import { useGetPublishedTournamentQuery } from "@/features/api/tournamentApi";
 
// const Tournaments = () => {
//   const {data, isLoading, isError} = useGetPublishedTournamentQuery();
 
//   if(isError) return <h1>Some error occurred while fetching tournaments.</h1>

//   return (
//     <div className="bg-gray-50 dark:bg-[#141414]">
//       <div className="max-w-7xl mx-auto p-6">
//            <div className="max-w-7xl mx-auto text-center">
//          <h2 className="text-gray-700 text-4xl sm:text-3xl mb-5 font-serif">
//          Compete at Every Level 
//          </h2>

//          <p className="max-w-3xl mx-auto text-base sm:text-lg text-gray-500 mb-12">
//          Compete in top-tier tournaments across local, national, and international levels. Rise to the challenge and showcase your skills!  
//       </p>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {isLoading ? (
//             Array.from({ length: 8 }).map((_, index) => (
//               <TournamentSkeleton key={index} />
//             ))
//           ) : (
//            data?.tournaments && data.tournaments.map((tournament, index) => <Tournament key={index} tournament={tournament}/>) 
//           )}
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Tournaments;

// const TournamentSkeleton = () => {
//   return (
//     <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
//       <Skeleton className="w-full h-36" />
//       <div className="px-5 py-4 space-y-3">
//         <Skeleton className="h-6 w-3/4" />
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <Skeleton className="h-6 w-6 rounded-full" />
//             <Skeleton className="h-4 w-20" />
//           </div>
//           <Skeleton className="h-4 w-16" />
//         </div>
//         <Skeleton className="h-4 w-1/4" />
//       </div>
//     </div>
//   );
// };
