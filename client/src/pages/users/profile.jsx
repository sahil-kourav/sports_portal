import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Button
} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [gender, setGender] = useState("other");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  

  const { data, isLoading, refetch } = useLoadUserQuery();
  const [
    updateUser,
    { data: updateUserData, isLoading: updateUserIsLoading, isError, error, isSuccess },
  ] = useUpdateUserMutation();

  const user = data?.user;

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    formData.append("gender", gender);
    formData.append("address", address);
    formData.append("dob", dob);
    await updateUser(formData);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setGender(user.gender || "other");
      setAddress(user.address || "");
      setDob(user.dob || "");
    }
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(updateUserData?.message || "Profile updated successfully.");
    }
    if (isError) {
      toast.error(error?.message || "Failed to update profile.");
    }
  }, [error, updateUserData, isSuccess, isError]);

  if (isLoading)
    return (
      <h1 className="text-center text-xl font-semibold py-10">Loading profile...</h1>
    );

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
        Your Profile
      </h1>

      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        {/* Profile Picture */}
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-28 w-28 md:h-36 md:w-36">
            <AvatarImage
              src={
                user?.photoUrl ||
                "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
              }
              alt="@user"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>

        {/* Profile Details */}
        <div className="flex-1 space-y-3 text-gray-800 dark:text-gray-200">
          <p><strong>Name:</strong> {user?.name || 'N/A'}</p>
          <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
          <p><strong>Gender:</strong> {user?.gender || 'N/A'}</p>
          <p><strong>Phone Number:</strong> {user?.number || 'N/A'}</p>
          <p><strong>Date of Birth:</strong> {user?.dob ? new Date(user.dob).toISOString().split('T')[0] : 'N/A'}</p>
          <p><strong>Address:</strong> {user?.address || 'N/A'}</p>

          {/* Edit Profile Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-4">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Profile</DialogTitle>
                <DialogDescription>
                Update your profile information below. Ensure all fields are
                filled before saving your changes.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-1">
                  <Label>Name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="space-y-1">
                  <Label>Gender</Label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="Other">Other</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <Label>Profile Photo</Label>
                  <Input type="file" accept="image/*" onChange={onChangeHandler} />
                </div>

                <div className="space-y-1">
                  <Label>Date of Birth</Label>
                  <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                </div>

                <div className="space-y-1">
                  <Label>Address</Label>
                  <Input value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
              </div>

              <DialogFooter>
                <Button onClick={updateUserHandler} disabled={updateUserIsLoading}>
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Profile;
