import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, User, Mail, Phone, MapPin, Calendar, Venus, Pencil } from "lucide-react";
import { toast } from "sonner";
import { useLoadUserQuery, useUpdateUserMutation } from "@/features/api/authApi";

/* ── helpers ── */
const DEFAULT_AVATAR =
  "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg";

const fmtDate = (d) => {
  if (!d) return "N/A";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit", month: "long", year: "numeric",
  });
};

/* ── info row ── */
const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
    <div className="shrink-0 w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center mt-0.5">
      <Icon size={15} className="text-gray-400" />
    </div>
    <div>
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">{label}</p>
      <p className="text-sm font-medium text-gray-800 mt-0.5">{value || "N/A"}</p>
    </div>
  </div>
);

/* ── field ── */
const Field = ({ label, children }) => (
  <div className="space-y-1.5">
    <Label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
      {label}
    </Label>
    {children}
  </div>
);

/* ── main ── */
const Profile = () => {
  const [name, setName]               = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [gender, setGender]           = useState("Other");
  const [address, setAddress]         = useState("");
  const [dob, setDob]                 = useState("");
  const [open, setOpen]               = useState(false);

  const { data, isLoading, refetch } = useLoadUserQuery();
  const [updateUser, { data: updateData, isLoading: saving, isError, error, isSuccess }] =
    useUpdateUserMutation();

  const user = data?.user;

  /* seed form when user loads */
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setGender(user.gender || "Other");
      setAddress(user.address || "");
      setDob(user.dob ? user.dob.split("T")[0] : "");
    }
  }, [user]);

  /* handle save result */
  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(updateData?.message || "Profile updated successfully.");
      setOpen(false);
    }
    if (isError) {
      toast.error(error?.data?.message || "Failed to update profile.");
    }
  }, [isSuccess, isError, error, updateData, refetch]);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("gender", gender);
    formData.append("address", address);
    formData.append("dob", dob);
    if (profilePhoto) formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  /* ── loading ── */
  if (isLoading)
    return (
      <div className="min-h-screen bg-[#f7f6f2] flex items-center justify-center">
        <Loader2 size={28} className="animate-spin text-gray-400" />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f7f6f2] py-12 px-6">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* ── header card ── */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 flex items-center gap-5">
          <Avatar className="h-20 w-20 shrink-0">
            <AvatarImage src={user?.photoUrl || DEFAULT_AVATAR} alt={user?.name} />
            <AvatarFallback className="bg-blue-50 text-blue-700 font-bold text-xl">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-gray-900 truncate">{user?.name}</h1>
            <p className="text-sm text-gray-400 truncate">{user?.email}</p>
            <span className="inline-block mt-2 text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
              {user?.role || "Player"}
            </span>
          </div>

          {/* Edit trigger */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5 shrink-0">
                <Pencil size={13} /> Edit
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Update your details below and save when done.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-2">
                <Field label="Name">
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
                </Field>

                <Field label="Gender">
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full h-9 px-3 text-sm border border-input rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </Field>

                <Field label="Date of Birth">
                  <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                </Field>

                <Field label="Address">
                  <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Your address" />
                </Field>

                <Field label="Profile Photo">
                  <Input type="file" accept="image/*" onChange={(e) => setProfilePhoto(e.target.files?.[0] || null)} />
                </Field>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)} disabled={saving}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={saving} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                  {saving ? <><Loader2 size={14} className="animate-spin" /> Saving…</> : "Save Changes"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* ── details card ── */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
            Profile Details
          </h2>
          <InfoRow icon={User}     label="Full Name"     value={user?.name} />
          <InfoRow icon={Mail}     label="Email"         value={user?.email} />
          <InfoRow icon={Venus}    label="Gender"        value={user?.gender} />
          <InfoRow icon={Phone}    label="Phone"         value={user?.number} />
          <InfoRow icon={Calendar} label="Date of Birth" value={fmtDate(user?.dob)} />
          <InfoRow icon={MapPin}   label="Address"       value={user?.address} />
        </div>

      </div>
    </div>
  );
};

export default Profile;