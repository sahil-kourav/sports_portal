// // Importing necessary modules and components
// import { useSelector } from "react-redux"; // Access user data from Redux store
// import EnrollTournamentButton from "@/components/EnrollTournamentButton";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { BadgeInfo, Calendar, Trophy, MapPin } from "lucide-react"; // Icons
// import { useGetTournamentDetailWithStatusQuery } from "@/features/api/tournamentApi"; // API call hook
// import React, { useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// const TournamentDetail = () => {
//   const { tournamentId } = useParams(); // Get tournament ID from route
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.auth.user); // Get current logged-in user

//   // Fetch tournament details and enrollment status
//   const { data, isLoading, isError } =
//     useGetTournamentDetailWithStatusQuery(tournamentId);

//   // Redirect enrolled users to the tournament progress page
//   useEffect(() => {
//     if (data?.enrolled) {
//       navigate(`/tournament-progress/${tournamentId}`);
//     }
//   }, [data, navigate, tournamentId]);

//   // Handle loading state
//   if (isLoading)
//     return (
//       <h1 className="text-center mt-10 text-xl animate-pulse">
//         Loading tournament details...
//       </h1>
//     );

//   // Handle error state
//   if (isError)
//     return (
//       <h1 className="text-center mt-10 text-red-500">
//         Failed to load tournament details
//       </h1>
//     );

//   const { tournament, enrolled } = data;

//   // Utility function to format date strings
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";

//     const date = new Date(dateString);
//     const day = date.getDate().toString().padStart(2, "0");
//     const month = date.toLocaleString("en-US", { month: "short" });
//     const year = date.getFullYear();

//     return `${day}-${month}-${year}`;
//   };

//   // Calculate user's age from their date of birth
//   const calculateUserAge = () => {
//     const dob = user?.dob;
//     if (!dob) return null;

//     const birthDate = new Date(dob);
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const m = today.getMonth() - birthDate.getMonth();

//     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
//     return age;
//   };

//   // Check if the user is eligible based on age criteria
//   const isAgeEligible = () => {
//     const { minAge, maxAge } = tournament;
//     const age = calculateUserAge();
//     return age !== null && age >= minAge && age <= maxAge;
//   };

//   return (
//     <div className="space-y-8">
//       {/* Header Section with Basic Tournament Info */}
//       <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-10 rounded-lg shadow-md">
//         <div className="max-w-6xl text-md space-y-1.5 mx-auto px-6 md:px-10 ">
//           <h1 className="text-3xl font-bold">{tournament?.tournamentTitle}</h1>
//           <p className="text-lg">{tournament?.subTitle}</p>
//           <p className="text-md italic">
//             Created By:{" "}
//             <span className="text-[#C0C4FC] underline ml-1">
//               {tournament.creator?.name}
//             </span>
//           </p>

//           {/* Last updated info */}
//           <p className="flex items-center gap-2">
//             <BadgeInfo size={18} />
//             Last updated: {formatDate(tournament?.createdAt)}
//           </p>

//           {/* Team capacity info */}
//           <p className="flex items-center gap-2 text-lg ">
//             <Trophy size={18} />
//             Hurry! Only {tournament?.maxTeams} spots available! 🚀
//           </p>

//           <p className="flex items-center gap-2 text-lg">
//             <Trophy size={18} />
//             Spots Filled: {tournament?.enrolledUsers?.length} out of{" "}
//             {tournament?.maxTeams} teams secured!
//           </p>

//           {/* Display age restriction message if user not eligible */}
//           {!isAgeEligible() && (
//             <p className="text-red-500 mt-2">
//               <strong>Age Criteria:</strong> Unfortunately, your age (
//               <span className="font-semibold">{calculateUserAge()}</span>) does
//               not fall within the eligible range ({tournament.minAge} –{" "}
//               {tournament.maxAge} years).
//               <br />
//               We encourage you to explore future opportunities.
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Main Content: Tournament Info & Enroll Card */}
//       <div className="max-w-6xl mx-auto px-4 md:px-10 flex flex-col lg:flex-row justify-between">
//         {/* Tournament Description & Schedule */}
//         <div className="w-full lg:w-1/2 space-y-4">
//           <h2 className="font-bold text-xl md:text-2xl text-gray-800">
//             About the Tournament
//           </h2>
//           {/* Rich HTML Description */}
//           <p
//             className="text-md leading-relaxed text-gray-900"
//             dangerouslySetInnerHTML={{
//               __html:
//                 tournament?.description || "<i>No description available</i>",
//             }}
//           />

//           {/* Schedule Info */}
//           <div>
//             <h1 className="py-2 font-bold text-lg">🏆 Tournament Schedule</h1>
//             <div className="text-md mb-10 space-y-2 ">
//               <p className="flex items-center gap-2">
//                 <MapPin size={18} />
//                 <span className="font-medium">Tournament Venue:</span>{" "}
//                 {tournament?.location || "Not Specified"}
//               </p>
//               <p className="flex items-center gap-2">
//                 <Calendar size={18} />
//                 <span className="font-medium">Starting Date:</span>{" "}
//                 {formatDate(tournament?.startDate)}
//               </p>
//               <p className="flex items-center gap-2">
//                 <Calendar size={18} />
//                 <span className="font-medium">Ending Date:</span>{" "}
//                 {formatDate(tournament?.endDate)}
//               </p>
//               <p className="flex items-center gap-2">
//                 <Calendar size={18} />
//                 <span className="font-medium">
//                   Registration Closes On:
//                 </span>{" "}
//                 {formatDate(tournament?.registrationDeadline)}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Enrollment Card Section */}
//         <div className="w-full lg:w-1/3">
//           <Card className="rounded-2xl border border-gray-300 transition-all duration-300 transform hover:scale-[1.03]">
//             <CardContent className="p-6 text-center rounded-t-2xl">
//               {/* Tournament Image */}
//               <img
//                 src={tournament.tournamentThumbnail}
//                 alt="Tournament Thumbnail"
//                 className="h-44 w-full object-cover rounded-lg shadow-md"
//               />

//               {/* Tournament Title */}
//               <h2 className="text-xl mt-2 font-bold text-gray-800 max-w-[95%] truncate">
//                 {tournament?.tournamentTitle}
//               </h2>

//               {/* Fee and Status Badge */}
//               <div className="mt-4 space-y-3">
//                 <p className="flex items-center gap-2 justify-center text-md font-semibold">
//                   <Trophy size={18} />
//                   Registration Fee:{" "}
//                   <span className="text-black font-bold">
//                     ₹{tournament?.registrationFee ?? 0}
//                   </span>
//                 </p>

//                 {tournament?.enrolledUsers?.length < tournament?.maxTeams ? (
//                   <p className="text-md font-semibold text-red-600 bg-red-100 py-1 px-3 rounded-lg inline-block animate-pulse">
//                     ⚡ Hurry! Limited Spots Available!
//                   </p>
//                 ) : (
//                   <p className="text-md font-semibold bg-red-200 py-2 rounded-lg inline-block animate-pulse">
//                     🚫 Enrollment Closed – No More Spots Available
//                   </p>
//                 )}
//               </div>
//             </CardContent>

//             {/* Enroll or Status Button */}
//             <CardFooter className="flex justify-center bg-white rounded-b-2xl">
//               {tournament?.enrolledUsers?.length >= tournament?.maxTeams ? (
//                 // Enrollment closed
//                 <Button
//                   disabled
//                   className="w-full bg-gray-500 text-white font-semibold py-3 rounded-xl cursor-not-allowed opacity-90"
//                 >
//                   ❌ Enrollment Closed
//                 </Button>
//               ) : enrolled ? (
//                 // Continue if already enrolled
//                 <Button
//                   onClick={() =>
//                     navigate(`/tournament-progress/${tournamentId}`)
//                   }
//                   className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
//                 >
//                   🎯 Continue Tournament
//                 </Button>
//               ) : !isAgeEligible() ? (
//                 // Disable enroll button if age not eligible
//                 <Button
//                   disabled
//                   className="w-full bg-gray-500 text-white font-semibold py-3 rounded-xl cursor-not-allowed opacity-90"
//                 >
//                   ❌ Age Criteria Not Met
//                 </Button>
//               ) : (
//                 // Show enroll button if all conditions pass
//                 <EnrollTournamentButton tournamentId={tournamentId} />
//               )}
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TournamentDetail;

// -------------------------------------------------------------
// TournamentDetails.jsx (WHITE THEME – PREMIUM CLEAN UI)
// -------------------------------------------------------------

import { useSelector } from "react-redux";
import EnrollTournamentButton from "@/components/EnrollTournamentButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Calendar,
  MapPin,
  CheckCircle,
  AlertTriangle,
  Users,
} from "lucide-react";
import { useGetTournamentDetailWithStatusQuery } from "@/features/api/tournamentApi";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TournamentDetail = () => {
  const { tournamentId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const { data, isLoading, isError } =
    useGetTournamentDetailWithStatusQuery(tournamentId);

  useEffect(() => {
    if (data?.enrolled) {
      navigate(`/tournament-progress/${tournamentId}`);
    }
  }, [data, navigate, tournamentId]);

  if (isLoading)
    return (
      <h1 className="text-center mt-10 text-xl animate-pulse text-gray-600">
        Loading...
      </h1>
    );

  if (isError)
    return (
      <h1 className="text-center mt-10 text-red-500">Failed to load details</h1>
    );

  const { tournament, enrolled } = data;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const d = new Date(dateString);
    const day = String(d.getDate()).padStart(2, "0");
    const month = d.toLocaleString("en-US", { month: "long" });
    const year = d.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const calculateUserAge = () => {
    if (!user?.dob) return null;
    const birth = new Date(user.dob);
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    if (
      now.getMonth() < birth.getMonth() ||
      (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  const isAgeEligible = () => {
    const age = calculateUserAge();
    return age !== null && age >= tournament.minAge && age <= tournament.maxAge;
  };

  return (
    <div className="min-h-screen w-full bg-white text-gray-900">
      {/* ---------------- HERO BANNER ---------------- */}

      <section
        className="py-16 md:py-16 overflow-hidden"
      >
        <div className="max-w-5xl px-28">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight drop-shadow-sm">
            {tournament.tournamentTitle}
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-lg text-gray-700 max-w-2xl leading-relaxed">
            {tournament.subTitle}
          </p>


          {/* Chips Row */}
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full font-medium shadow-sm">
              <AlertTriangle size={18} />
              Only {tournament.maxTeams} spots available
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium shadow-sm">
              <Users size={18} />
              Spots: {tournament.enrolledUsers?.length}/{tournament.maxTeams}
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium shadow-sm">
              <CheckCircle size={18} />
              Age: {tournament.minAge}-{tournament.maxAge}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-12">
          {/* About */}
          <section>
            <h3 className="text-2xl font-bold text-gray-700">
              About the Tournament
            </h3>
            <p className="mt-4 text-gray-700 leading-relaxed text-[16px]">
              {tournament.description}
            </p>
          </section>

          {/* Schedule */}
          <section>
            <h3 className="text-2xl font-bold text-gray-700">
              Schedule & Details
            </h3>

            <div className="mt-6 grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: <MapPin size={28} className="text-blue-600" />,
                  title: "Venue",
                  value: tournament.location,
                },
                {
                  icon: <Calendar size={28} className="text-blue-600" />,
                  title: "Tournament Starts",
                  value: formatDate(tournament.startDate),
                },
                {
                  icon: <Calendar size={28} className="text-blue-600" />,
                  title: "Tournament Ends",
                  value: formatDate(tournament.endDate),
                },
                {
                  icon: <Calendar size={28} className="text-blue-600" />,
                  title: "Registration Closes",
                  value: formatDate(tournament.registrationDeadline),
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-xl border border-gray-200 flex gap-4"
                >
                  {item.icon}
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {item.title}
                    </h4>
                    <p className="text-gray-600">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-1">
          <Card className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 sticky top-24">
            <div
              className="aspect-video bg-cover bg-center rounded-lg mb-4 shadow-lg"
              style={{
                backgroundImage: `url(${tournament.tournamentThumbnail})`,
              }}
            ></div>

            <h4 className="text-2xl font-semibold text-gray-900">
              {tournament.tournamentTitle}
            </h4>

            <p className="text-xl font-bold mt-3 text-gray-900">
              ₹{tournament.registrationFee}
              <span className="text-gray-500 text-sm ml-2">/ Team</span>
            </p>

            {/* Availability */}
            <div className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Spots Available:</span>
                <span className="font-bold text-gray-900">
                  {tournament.maxTeams - tournament.enrolledUsers?.length} /{" "}
                  {tournament.maxTeams}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Age Requirement:</span>
                {isAgeEligible() ? (
                  <span className="font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                    Eligible
                  </span>
                ) : (
                  <span className="font-bold text-red-600 bg-red-100 px-3 py-1 rounded-full">
                    Not Eligible
                  </span>
                )}
              </div>
            </div>

            {/* Button */}
            <div className="mt-8">
              {tournament.enrolledUsers.length >= tournament.maxTeams ? (
                <Button disabled className="w-full bg-gray-300 text-gray-600">
                  Enrollment Full
                </Button>
              ) : enrolled ? (
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={() =>
                    navigate(`/tournament-progress/${tournamentId}`)
                  }
                >
                  Continue Tournament
                </Button>
              ) : !isAgeEligible() ? (
                <Button disabled className="w-full bg-gray-300 text-gray-600">
                  Age Criteria Not Met
                </Button>
              ) : (
                <EnrollTournamentButton tournamentId={tournamentId} />
              )}
            </div>

            <p className="text-xs text-center mt-4 text-gray-500">
              Registration closes on{" "}
              {formatDate(tournament.registrationDeadline)}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetail;
