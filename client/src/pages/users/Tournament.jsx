import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";

const Tournament = ({ tournament }) => {
  return (
    <Link to={`/tournament-detail/${tournament._id}`} className=" group max-xl:mx-auto">
        {/* Tournament Image */}
        <div className="bg-[#F5F5F5] h-40 sm:w-70 sm:h-68 rounded-lg flex items-center justify-center">
          <img
            src={tournament.tournamentThumbnail}
            alt={tournament.tournamentTitle}
            width={500}
            height={500}
            className="max-h-30 sm:max-h-40 w-auto group-hover:scale-115 transition duration-300"
          />
        </div>

        <div className="flex justify-between px-1 gap-3 text-sm text-slate-800 pt-2">
          <div>
            <p className="truncate text-sm text-neutral-800 max-w-[200px]">
              {tournament.tournamentTitle}
            </p>
          </div>
          <p>₹{tournament.registrationFee.toLocaleString()}</p>
        </div>
    </Link>
  );
};

export default Tournament;
