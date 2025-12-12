import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Tournament = ({ tournament }) => {
  return (
    <Link to={`/tournament-detail/${tournament._id}`}>
      <Card className="border border-gray-300 rounded-2xl overflow-hidden transition-transform duration-200 hover:scale-[1.03] shadow-md bg-white">
        {/* Tournament Image */}
        <div className="relative w-full h-44">
          <img
            src={tournament.tournamentThumbnail}
            alt={tournament.tournamentTitle}
            className="w-full h-full object-cover rounded-t-2xl"
          />
        </div>

        {/* Tournament Info */}
        <div className="p-4 flex flex-col gap-1">
          {/* Title */}
          <h1 className="text-lg font-bold text-gray-800 text-left truncate">
            {tournament.tournamentTitle}
          </h1>

          {/* Subtitle */}
          <p className="text-md text-gray-500 truncate text-left">
            {tournament.subTitle || "No description available"}
          </p>

          <div className="flex items-center mt-1 max-w-[180px] sm:max-w-[200px] truncate">
            <MapPin size={14} /> 
            <span className="truncate ml-1"> { tournament.location}</span>
          </div>

          {/* Action Button */}
          <div className="mt-2">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all shadow-md">
              View Details
            </button>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default Tournament;
