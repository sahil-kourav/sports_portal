// import React, { useState } from "react";
// import { Button } from "./ui/button";
// import { toast } from "sonner";

// const EnrollTournamentButton = ({ tournamentId }) => {
//   const [loading, setLoading] = useState(false);

//   const enrollInTournament = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`http://localhost:8080/api/v1/tournament/${tournamentId}/enroll`, {
//         method: "POST",
//         credentials: "include",
//       });

//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.message || "Failed to enroll");
//       }

//       toast.success("Successfully enrolled! 🎉");
//       window.location.href = `/tournament/${tournamentId}/tournament-progress`; 
//     } catch (error) {
//       console.error("Error enrolling:", error);
//       toast.error(error.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Button disabled={loading} onClick={enrollInTournament} className="w-full">
//       {loading ? "Enrolling..." : "Enroll for Free"}
//     </Button>
//   );
// };

// export default EnrollTournamentButton;












import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";

const EnrollTournamentButton = ({ tournamentId }) => {
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  // ✅ Check if user is already enrolled
  useEffect(() => {
    const checkEnrollmentStatus = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/tournament/${tournamentId}/status`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        if (response.ok && data.enrolled) {
          setEnrolled(true);
        }
      } catch (error) {
        console.error("Error checking enrollment status:", error);
      }
    };

    checkEnrollmentStatus();
  }, [tournamentId]);

  const enrollInTournament = async () => {
    if (enrolled) {
      toast.error("You are already enrolled! 🎟️");
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/v1/tournament/${tournamentId}/enroll`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to enroll");
      }

      toast.success("Successfully enrolled! 🎉");
      window.location.href = `/tournament-progress/${tournamentId}/`; 
      setEnrolled(true);
    } catch (error) {
      console.error("Error enrolling:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button disabled={loading || enrolled} onClick={enrollInTournament} className="w-full">
      {loading ? "Enrolling..." : enrolled ? "You are already enrolled" : "Enroll Now"}
    </Button>
  );
};

export default EnrollTournamentButton;
