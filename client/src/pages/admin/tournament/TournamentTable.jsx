import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteTournamentMutation, useGetCreatorTournamentQuery } from "@/features/api/tournamentApi";
import { Edit, Loader2, Trash } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TournamentTable = () => {
  const { data, isLoading } = useGetCreatorTournamentQuery();
  const navigate = useNavigate();

  const [deleteTournament, { isLoading: isDeleting }] = useDeleteTournamentMutation();

  const handleDeleteTournament = async (tournamentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await deleteTournament(tournamentId).unwrap();
      alert("Tournament deleted successfully!");
    } catch (error) {
      console.error("Error deleting tournament:", error);
      alert("Failed to delete tournament.");
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
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md w-full">
      <Button
        onClick={() => navigate(`create`)}
        className="mb-4 bg-blue-600 hover:bg-blue-700 text-white font-bold"
      >
        + Create Tournament
      </Button>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <Table className="border border-gray-200 min-w-[600px]">
          <TableCaption className="text-gray-600 text-sm">
            A list of your recent tournaments.
          </TableCaption>

          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-[120px] font-bold uppercase text-sm sm:text-base">Entry Fee</TableHead>
              <TableHead className="font-bold uppercase text-sm sm:text-base">Status</TableHead>
              <TableHead className="font-bold uppercase text-sm sm:text-base">Title</TableHead>
              <TableHead className="text-right font-bold uppercase text-sm sm:text-base">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {(data?.tournaments || []).map((tournament, index) => (
              <TableRow key={tournament._id} className={index % 2 === 0 ? "bg-gray-50" : ""}>

                <TableCell className="font-medium text-gray-700 text-sm sm:text-base">
                  {tournament?.registrationFee || "NA"}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`px-2 py-1 text-xs sm:text-sm transition-colors duration-300 cursor-pointer ${tournament.isPublished
                        ? "bg-green-100 text-green-700 hover:bg-green-700 hover:text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-700 hover:text-white"
                      }`}
                  >
                    {tournament.isPublished ? "Published" : "Draft"}
                  </Badge>
                </TableCell>

                <TableCell className="text-gray-800 text-sm sm:text-base">
                  {tournament.tournamentTitle}
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate(`${tournament._id}`)}
                      className="hover:bg-gray-200 p-2 rounded"
                    >
                      <Edit className="w-4 h-4 sm:w-5 sm:h-5 text-blue-700" />
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      className="hover:bg-gray-200 p-2 rounded"
                      onClick={() => handleDeleteTournament(tournament._id)}
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-red-600" />
                      ) : (
                        <Trash className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
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
