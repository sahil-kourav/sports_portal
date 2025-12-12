import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import UserDetailsModal from "./UserDetailsModal";

const EnrolledUsers = () => {
  const [users, setUsers] = useState([]); // Store enrolled users
  const [loading, setLoading] = useState(true); // Handle loading state
  const [selectedUserId, setSelectedUserId] = useState(null); // For modal

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/api/v1/enrollment/admin/enrollments",
          {
            credentials: "include",
          }
        );
        if (!res.ok) throw new Error("Failed to fetch enrollments");

        const result = await res.json();
        console.log("API Response:", result);
        setUsers(result.users || []);
      } catch (err) {
        console.error("Error fetching users:", err);
        toast.error("Failed to load enrolled users.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  if (loading) {
    return (
      <div className="text-center mt-10 text-lg font-medium">
        Loading enrolled users...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto my-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Enrolled Users</h1>

      {users.length === 0 ? (
        <p className="text-gray-500">No users enrolled yet.</p>
      ) : (
        users.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between bg-white dark:bg-gray-900 p-4 mb-3 shadow rounded-xl"
          >
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-muted-foreground">
                  Tournament: {user.tournament || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={() => setSelectedUserId(user.userId)}>
                    Show Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-xl">
                  <UserDetailsModal userId={selectedUserId} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default EnrolledUsers;
