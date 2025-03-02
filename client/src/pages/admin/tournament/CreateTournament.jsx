// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useCreateTournamentMutation } from "@/features/api/tournamentApi";
// import { Loader2 } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// const CreateTournament = () => {
//   const [tournamentTitle, setTournamentTitle] = useState("");
//   const [category, setCategory] = useState("");

//   const [createTournament, { data, isLoading, error, isSuccess }] =
//     useCreateTournamentMutation();

//   const navigate = useNavigate();

//   const getSelectedCategory = (value) => {
//     setCategory(value);
//   };

//   const createTournamentHandler = async () => {
//     await createTournament({ tournamentTitle, category });
//   };

//   // for displaying toast
//   useEffect(()=>{
//     if(isSuccess){
//         toast.success(data?.message || "Tournament created.");
//         navigate("/admin/tournament");
//     }
//   },[isSuccess, error])

//   return (
//     <div className="flex-1 mx-10">
//       <div className="mb-4">
//         <h1 className="font-bold text-xl">
//           Lets add Tournament, add some basic Tournament details for your new tournament
//         </h1>
//         <p className="text-sm">
//           Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus,
//           laborum!
//         </p>
//       </div>
//       <div className="space-y-4">
//         <div>
//           <Label>Title</Label>
//           <Input
//             type="text"
//             value={tournamentTitle}
//             onChange={(e) => setTournamentTitle(e.target.value)}
//             placeholder="Your Course Name"
//           />
//         </div>
//         <div>
//           <Label>Category</Label>
//           <Select onValueChange={getSelectedCategory}>
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Select a category" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 <SelectLabel>Category</SelectLabel>
//                 <SelectItem value="Next JS">Next JS</SelectItem>
//                 <SelectItem value="Data Science">Data Science</SelectItem>
//                 <SelectItem value="Frontend Development">
//                   Frontend Development
//                 </SelectItem>
//                 <SelectItem value="Fullstack Development">
//                   Fullstack Development
//                 </SelectItem>
//                 <SelectItem value="MERN Stack Development">
//                   MERN Stack Development
//                 </SelectItem>
//                 <SelectItem value="Javascript">Javascript</SelectItem>
//                 <SelectItem value="Python">Python</SelectItem>
//                 <SelectItem value="Docker">Docker</SelectItem>
//                 <SelectItem value="MongoDB">MongoDB</SelectItem>
//                 <SelectItem value="HTML">HTML</SelectItem>
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//         </div>
//         <div className="flex items-center gap-2">
//           <Button variant="outline" onClick={() => navigate("/admin/tournament")}>
//             Back
//           </Button>
//           <Button disabled={isLoading} onClick={createTournamentHandler}>
//             {isLoading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Please wait
//               </>
//             ) : (
//               "Create"
//             )}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateTournament;



import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateTournamentMutation } from "@/features/api/tournamentApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateTournament = () => {
  const [tournamentTitle, setTournamentTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");



  const [createTournament, { data, isLoading, error, isSuccess }] =
    useCreateTournamentMutation();

  const navigate = useNavigate();

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  const createTournamentHandler = async () => {
    if (!tournamentTitle || !category || !location || !date) {
        toast.error("All fields are required!");
        return;
    }

    try {
        const response = await createTournament({ 
            tournamentTitle, 
            category, 
            location, 
            date 
        }).unwrap();
        toast.success(response?.message || "Tournament created successfully.");z
    } catch (err) {
        toast.error(err?.data?.message || "Failed to create tournament.");
    }
};




  // for displaying toast
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Tournament created.");
      navigate("/admin/tournament");
    }
    if (error) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  }, [isSuccess, error]);


  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Create a New Sports Tournament
        </h1>
        <p className="text-sm">
          Provide basic details for your new sports tournament.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={tournamentTitle}
            onChange={(e) => setTournamentTitle(e.target.value)}
            placeholder="Enter Tournament Title"
          />
        </div>
        <div>
          <Label>Sport Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select a sport" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sports</SelectLabel>
                <SelectItem value="Cricket">Cricket</SelectItem>
                <SelectItem value="Football">Football</SelectItem>
                <SelectItem value="Basketball">Basketball</SelectItem>
                <SelectItem value="Tennis">Tennis</SelectItem>
                <SelectItem value="Badminton">Badminton</SelectItem>
                <SelectItem value="Hockey">Hockey</SelectItem>
                <SelectItem value="Volleyball">Volleyball</SelectItem>
                <SelectItem value="Kabaddi">Kabaddi</SelectItem>
                <SelectItem value="Table Tennis">Table Tennis</SelectItem>
                <SelectItem value="Swimming">Swimming</SelectItem>
                <SelectItem value="Athletics">Athletics</SelectItem>
                <SelectItem value="Chess">Chess</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Date</Label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div>
          <Label>Location</Label>
          <Input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter location" />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/admin/tournament")}>
            Back
          </Button>
          <Button disabled={isLoading} onClick={createTournamentHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTournament;
