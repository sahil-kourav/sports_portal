import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Users, Calendar } from "lucide-react";

const SearchResult = ({ tournament }) => {
  const spotsLeft =
    tournament.maxTeams - (tournament.enrolledUsers?.length ?? 0);

  return (
    <Link
      to={`/tournament-detail/${tournament._id}`}
      className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all bg-white group"
    >
      {/* Thumbnail */}
      <img
        src={tournament.tournamentThumbnail}
        alt={tournament.tournamentTitle}
        className="w-full sm:w-44 h-32 object-cover rounded-xl shrink-0 bg-gray-100"
      />

      {/* Info */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          {/* Category badge + title */}
          <div className="flex items-start gap-2 flex-wrap mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
              {tournament.category}
            </span>
          </div>
          <h3 className="font-bold text-gray-900 text-base sm:text-lg leading-snug group-hover:text-blue-600 transition-colors truncate">
            {tournament.tournamentTitle}
          </h3>
          {tournament.subTitle && (
            <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">
              {tournament.subTitle}
            </p>
          )}
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-gray-400">
          {tournament.location && (
            <span className="flex items-center gap-1">
              <MapPin size={12} /> {tournament.location}
            </span>
          )}
          {tournament.startDate && (
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {new Date(tournament.startDate).toLocaleDateString("en-IN", {
                day: "2-digit", month: "short", year: "numeric",
              })}
            </span>
          )}
          {tournament.maxTeams && (
            <span className="flex items-center gap-1">
              <Users size={12} /> {spotsLeft} spots left
            </span>
          )}
        </div>

        {/* Organizer */}
        {tournament.creator?.name && (
          <p className="text-xs text-gray-400 mt-1">
            By{" "}
            <span className="font-semibold text-gray-600">
              {tournament.creator.name}
            </span>
          </p>
        )}
      </div>

      {/* Fee */}
      <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 sm:pl-4 sm:border-l border-gray-100">
        <p className="text-[11px] text-gray-400 uppercase tracking-widest hidden sm:block">
          Entry Fee
        </p>
        <p className="text-xl font-bold text-gray-900">
          ₹{tournament.registrationFee}
        </p>
        <p className="text-xs text-gray-400">/ team</p>
      </div>
    </Link>
  );
};

export default SearchResult;