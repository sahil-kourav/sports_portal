import React from "react";
import { useGetUserDetailsQuery } from "@/features/api/enrollmentApi";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "@/components/ui/avatar";

const UserDetailsModal = ({ userId }) => {
  const { data, isLoading, isError } = useGetUserDetailsQuery(userId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-gray-500 text-lg">Loading user details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-red-500 text-lg">Error fetching user details.</p>
      </div>
    );
  }

  const user = data?.user;
  console.log("User Details:", user);

  return (
    <div className="bg-white shadow-xl rounded-3xl px-6 py-10 w-full max-w-3xl mx-auto sm:px-8 md:px-12 lg:px-16">
      <div className="flex flex-col items-center mb-8">
        <div className="flex flex-col items-center space-y-4">
          {/* <Avatar className="h-28 w-28 md:h-36 md:w-36"> */}
          <Avatar className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full ring-4 ring-indigo-500 shadow-xl overflow-hidden transition-transform transform group-hover:scale-105">
            <AvatarImage
              src={
                user?.photoUrl ||
                "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
              }
              alt="User Avatar"
              className="object-cover w-full h-full rounded-full border-2"
            />
            <AvatarFallback>
              {user?.name?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </div>
        <h2 className="text-3xl font-semibold text-indigo-600 mt-5">
          User Profile
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        <div className="gap-x-16 gap-y-3 grid grid-cols-1 sm:grid-cols-2">
          <ProfileRow label="Full Name" value={user?.name} />
          <ProfileRow label="Email Address" value={user?.email} />
          <ProfileRow label="Phone Number" value={user?.number} />
          <ProfileRow
            label="Date of Birth"
            value={
              user?.dob ? new Date(user.dob).toISOString().split("T")[0] : "N/A"
            }
          />
        </div>

        {/* Address that wraps to next line if too long */}
        <div className="flex flex-col w-full">
          <p className="text-md font-bold">
            Address
          </p>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 w-full">
            <p className="break-words">{user?.address || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileRow = ({ label, value, className = "" }) => (
  <div className={`flex flex-col ${className}`}>
    <span className="text-md font-bold">{label}</span>
    <span className="">{value || "N/A"}</span>
  </div>
);

export default UserDetailsModal;
