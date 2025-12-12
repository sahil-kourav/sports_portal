// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useDeleteTournamentMutation, useGetCreatorTournamentQuery } from "@/features/api/tournamentApi";
// import { Edit, Loader2, Trash } from "lucide-react";

// const TournamentTable = () => {
//   const { data, isLoading } = useGetCreatorTournamentQuery();
//   const navigate = useNavigate();
//   const [deleteTournament, { isLoading: isDeleting }] = useDeleteTournamentMutation();

//   const handleDeleteTournament = async (tournamentId) => {
//     if (!window.confirm("Are you sure you want to delete?")) return;

//     try {
//       await deleteTournament(tournamentId).unwrap();
//       alert("Tournament deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting tournament:", error);
//       alert("Failed to delete tournament.");
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-40">
//         <Loader2 className="animate-spin w-10 h-10 text-blue-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-md w-full p-4">
//       {/* Create Tournament Button */}
//       <Button
//         onClick={() => navigate("create")}
//         className="mb-5 bg-blue-600 hover:bg-blue-700 text-white font-bold"
//       >
//         + Create Tournament
//       </Button>

//       {/* Responsive Table Container */}
//       <div className="overflow-x-auto">
//         <Table className="border border-gray-200 min-w-[600px]">
//           <TableCaption className="text-gray-600 text-sm">
//             A list of your recent tournaments.
//           </TableCaption>

//           <TableHeader className="bg-gray-100">
//             <TableRow>
//               <TableHead className="font-bold px-3 uppercase text-sm sm:text-base">Title</TableHead>
//               <TableHead className="w-[180px] text-center font-bold uppercase text-sm sm:text-base">
//                 Enrolled Users
//               </TableHead>
//               <TableHead className="text-center font-bold uppercase text-sm sm:text-base">Status</TableHead>
//               <TableHead className="w-[100px] px-5 text-center font-bold uppercase text-sm sm:text-base">
//                 Action
//               </TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {(data?.tournaments || []).map((tournament, index) => (
//               <TableRow key={tournament._id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
//                 <TableCell className="text-gray-800 px-3 text-sm sm:text-base">{tournament.tournamentTitle}</TableCell>

//                 <TableCell className="font-medium text-gray-700 text-center text-sm sm:text-base">
//                   {tournament?.enrolledUsers.length || "0"}
//                 </TableCell>

//                 <TableCell className="text-center">
//                   <Badge
//                     className={`px-2 py-1 text-xs sm:text-sm transition-all duration-300 ${
//                       tournament.isPublished
//                         ? "bg-green-100 text-green-700 hover:bg-green-700 hover:text-white"
//                         : "bg-gray-100 text-gray-700 hover:bg-gray-700 hover:text-white"
//                     }`}
//                   >
//                     {tournament.isPublished ? "Published" : "Draft"}
//                   </Badge>
//                 </TableCell>

//                 <TableCell className="text-center px-3">
//                   <div className="flex items-center justify-center space-x-2">
//                     <Button
//                       size="sm"
//                       variant="ghost"
//                       onClick={() => navigate(`${tournament._id}`)}
//                       className="hover:bg-gray-200 p-2 rounded"
//                     >
//                       <Edit className="w-4 h-4 sm:w-5 sm:h-5 text-blue-700" />
//                     </Button>

//                     <Button
//                       size="sm"
//                       variant="ghost"
//                       className="hover:bg-gray-200 p-2 rounded"
//                       onClick={() => handleDeleteTournament(tournament._id)}
//                       disabled={isDeleting}
//                     >
//                       {isDeleting ? (
//                         <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-red-600" />
//                       ) : (
//                         <Trash className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
//                       )}
//                     </Button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default TournamentTable;
















import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteTournamentMutation,
  useGetCreatorTournamentQuery,
  usePublishTournamentMutation,
} from "@/features/api/tournamentApi";
import { Edit, Loader2, Trash, Upload, EyeOff } from "lucide-react";
import { toast } from "sonner";

const TournamentTable = () => {
  const { data, isLoading, refetch } = useGetCreatorTournamentQuery();
  const navigate = useNavigate();

  const [deleteTournament, { isLoading: isDeleting }] = useDeleteTournamentMutation();
  const [publishTournament, { isLoading: isPublishing }] = usePublishTournamentMutation();

  // 🗑️ Delete Tournament
  const handleDeleteTournament = async (tournamentId) => {
    if (!window.confirm("Are you sure you want to delete this tournament?")) return;

    try {
      await deleteTournament(tournamentId).unwrap();
      toast.success("Tournament deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete tournament.");
    }
  };

  // 📢 Publish / Unpublish Tournament
  const handleTogglePublish = async (tournamentId, currentStatus) => {
    const newStatus = currentStatus ? "false" : "true";
    try {
      const response = await publishTournament({ tournamentId, query: newStatus }).unwrap();
      toast.success(response.message || `Tournament ${currentStatus ? "unpublished" : "published"} successfully`);
      refetch();
    } catch (error) {
      toast.error("Failed to update tournament status.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin w-10 h-10 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md w-full p-4">
      {/* Create Tournament Button */}
      <Button
        onClick={() => navigate("create")}
        className="mb-5 bg-blue-600 hover:bg-blue-700 text-white font-bold"
      >
        + Create Tournament
      </Button>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <Table className="border border-gray-200 min-w-[700px]">
          <TableCaption className="text-gray-600 text-sm">
            A list of your recent tournaments.
          </TableCaption>

          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="font-bold px-3 uppercase text-sm sm:text-base">
                Title
              </TableHead>
              <TableHead className="text-center font-bold uppercase text-sm sm:text-base">
                Enrolled Users
              </TableHead>
              <TableHead className="text-center font-bold uppercase text-sm sm:text-base">
                Status
              </TableHead>
              <TableHead className="text-center font-bold uppercase text-sm sm:text-base">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {(data?.tournaments || []).map((tournament, index) => (
              <TableRow
                key={tournament._id}
                className={index % 2 === 0 ? "bg-gray-50" : ""}
              >
                <TableCell className="text-gray-800 px-3 text-sm sm:text-base">
                  {tournament.tournamentTitle}
                </TableCell>

                <TableCell className="text-center text-gray-700 text-sm sm:text-base">
                  {tournament?.enrolledUsers?.length || "0"}
                </TableCell>

                <TableCell className="text-center">
                  <Badge
                     className={`px-2 py-1 text-xs sm:text-sm transition-all duration-300 ${
                      tournament.isPublished
                        ? "bg-green-100 text-green-700 hover:bg-green-700 hover:text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    {tournament.isPublished ? "Published" : "Draft"}
                  </Badge>
                </TableCell>

                <TableCell className="text-center px-3">
                  <div className="flex items-center justify-center space-x-2">
                    {/* Edit */}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate(`${tournament._id}`)}
                      className="hover:bg-gray-200 p-2 rounded"
                    >
                      <Edit className="w-4 h-4 text-blue-600" />
                    </Button>

                    {/* Publish / Unpublish */}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        handleTogglePublish(tournament._id, tournament.isPublished)
                      }
                      disabled={isPublishing}
                      className="hover:bg-gray-200 p-2 rounded"
                    >
                      {tournament.isPublished ? (
                        <EyeOff className="w-4 h-4 text-yellow-600" />
                      ) : (
                        <Upload className="w-4 h-4 text-green-600" />
                      )}
                    </Button>

                    {/* Delete */}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteTournament(tournament._id)}
                      disabled={isDeleting}
                      className="hover:bg-gray-200 p-2 rounded"
                    >
                      {isDeleting ? (
                        <Loader2 className="w-4 h-4 animate-spin text-red-600" />
                      ) : (
                        <Trash className="w-4 h-4 text-red-500" />
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TournamentTable;
