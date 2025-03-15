import { Badge } from "@/components/ui/badge";
import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ tournament }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 py-4 gap-4">
      <Link
        to={`/tournament-detail/${tournament._id}`}
        className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
      >
        <img
          src={tournament.tournamentThumbnail}
          alt="tournament-thumbnail"
          className="h-32 w-full md:w-56 object-cover rounded"
        />
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg md:text-xl">{tournament.tournamentTitle}</h1>
          <p className="text-sm text-gray-600">{tournament.subTitle}</p>
          <p className="text-sm text-gray-700">
            Organizer: <span className="font-bold">{tournament.creator?.name}</span>{" "}
          </p>
          <Badge className="w-fit mt-2 md:mt-0">{tournament.category}</Badge>
        </div>
      </Link>
      <div className="mt-4 md:mt-0 md:text-right w-full md:w-auto">
        <h1 className="font-bold text-lg md:text-xl">₹{tournament.registrationFee}</h1>
      </div>
    </div>
  );
};

export default SearchResult;
