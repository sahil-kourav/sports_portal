import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";


const Tournament = ({ tournament }) => {
  return (
    <Link to={`/tournament-detail/${tournament._id}`}>
      <Card className="border border-gray-300 rounded-lg overflow-hidden transition-transform duration-200 hover:scale-[1.02] shadow-sm">
        <div className="relative">
          <img
            src={tournament.tournamentThumbnail || "NA"}
            alt="tournament"
            className="w-full h-36 object-cover rounded-t-lg"
          />
        </div>

        {/* Tournament Info */}
        <div className="p-3 mb-1 text-left">
          <h1 className="text-base font-semibold text-lg max-w-[95%] truncate">
            {tournament.tournamentTitle || "NA"}
          </h1>
          <p className="text-sm text-gray-500 truncate">{tournament.subTitle || "NA"}</p>

          {/* Creator Info */}
          <div className="flex items-center gap-3 mt-2 mb-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={tournament.creator?.photoUrl || "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"}
                alt="creator"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="text-sm font-medium">{tournament.creator?.name || "NA"}</h1>
          </div>

          <div className="text-lg font-bold">
            <span>₹{tournament.registrationFee || "NA"}</span>
          </div>
        </div>
      </Card>
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








