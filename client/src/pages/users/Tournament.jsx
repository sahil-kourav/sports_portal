import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { Link } from "react-router-dom";

const Tournament = ({ tournament }) => {
  return (
    <Link
      to={`/tournament-detail/${tournament._id}`}
      className="border border-gray-300 rounded-lg overflow-hidden transition-transform duration-200 hover:scale-[1.02] shadow-sm"
    >
      {/* Tournament Image */}
      <img
        src={tournament.tournamentThumbnail|| "NA"}
        alt="tournament"
        className="w-full h-36 object-cover rounded-t-lg"
      />
       <Badge className={`absolute top-3 left-3 px-3 py-1 text-sm ${tournament.isPublished ? "bg-gray-600 text-white" : "bg-gray-400 text-white"}`}>
             {tournament.isPublished ? "Live" : "Draft" || "NA"}
           </Badge>

      {/* Tournament Info */}
      <div className="p-3 mb-2 text-left">
        <h3 className="text-base font-semibold max-w-[95%] truncate">
          {tournament.tournamentTitle || "NA"}
        </h3>
        <p className="text-sm text-gray-500 truncate">{tournament.subTitle || "NA"}</p>

        {/* Creator Info */}
        <div className="flex items-center gap-3 mt-3 mb-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={tournament.creator?.photoUrl || "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"}
              alt="creator"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-sm font-medium">{tournament.creator?.name || "NA"}</p>
        </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
              ₹{tournament.registrationFee || "NA"}
            </p>
      </div>
    </Link>
  );
};

export default Tournament;

















{/* <div className="mb-6 px-2">
      <Card className="overflow-hidden rounded-2xl shadow-lg dark:bg-gray-900 bg-white w-full max-w-sm mx-auto transition-transform hover:scale-105 duration-300">
        <div className="relative">
          <img
            src={tournament.tournamentThumbnail}
            alt="tournament"
            className="w-full h-40 object-cover rounded-t-2xl"
          />
          <Badge className={`absolute top-3 left-3 px-3 py-1 text-sm ${tournament.isPublished ? "bg-green-600 text-white" : "bg-gray-400 text-white"}`}>
            {tournament.isPublished ? "Live" : "Draft"}
          </Badge>
        </div>
        <CardContent className="px-4 py-3 space-y-2">
          <h1 className="font-bold text-xl truncate text-gray-900 dark:text-white">
            {tournament.tournamentTitle}
          </h1>
            <div className="flex items-center gap-2 truncate">
              <span>{tournament.subTitle}</span>
            </div>
          
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={tournament.creator?.photoUrl || "https://github.com/shadcn.png"} alt="creator" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-medium text-gray-800 dark:text-gray-300 text-sm flex items-center gap-1">
                {tournament.creator?.name || "NA"}
              </h2>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-1">
              ₹{tournament.registrationFee}
            </div>
          </div>
        </CardContent>
      </Card>
    </div> */}








