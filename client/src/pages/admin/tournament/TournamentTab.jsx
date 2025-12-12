// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";
// import RichTextEditor from "@/components/RichTextEditor";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   useEditTournamentMutation,
//   useGetTournamentByIdQuery,
//   usePublishTournamentMutation,
// } from "@/features/api/tournamentApi";

// const TournamentTab = () => {
//   const [input, setInput] = useState({
//     tournamentTitle: "",
//     subTitle: "",
//     description: "",
//     category: "",
//     startDate: "",
//     endDate: "",
//     tournamentThumbnail: "",
//     location: "",
//     registrationFee: "",
//     registrationDeadline: "",
//     maxTeams: "",
//     maxAge: "",
//     minAge: "",
//   });

//   const params = useParams();
//   const tournamentId = params.tournamentId;

//   const {
//     data: tournamentByIdData,
//     isLoading: tournamentByIdLoading,
//     refetch,
//   } = useGetTournamentByIdQuery(tournamentId);

//   const [publishTournament, {}] = usePublishTournamentMutation();
//   const [editTournament, { data, isLoading, isSuccess, error }] =
//     useEditTournamentMutation();

//   useEffect(() => {
//     if (tournamentByIdData?.tournament) {
//       const tournament = tournamentByIdData?.tournament;
//       setInput({
//         tournamentTitle: tournament.tournamentTitle,
//         subTitle: tournament.subTitle,
//         description: tournament.description,
//         category: tournament.category,
//         location: tournament.location,
//         startDate: tournament.startDate,
//         endDate: tournament.endDate,
//         registrationFee: tournament.registrationFee,
//         registrationDeadline: tournament.registrationDeadline,
//         maxTeams: tournament.maxTeams,
//         maxAge: tournament.maxAge,
//         minAge: tournament.minAge,
//         tournamentThumbnail: "",
//       });
//     }
//   }, [tournamentByIdData]);

//   const [previewThumbnail, setPreviewThumbnail] = useState("");
//   const navigate = useNavigate();

//   const changeEventHandler = (e) => {
//     const { name, value } = e.target;
//     setInput({ ...input, [name]: value });
//   };

//   // get file
//   const selectThumbnail = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setInput({ ...input, tournamentThumbnail: file });
//       const fileReader = new FileReader();
//       fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
//       fileReader.readAsDataURL(file);
//     }
//   };

//   const updateTournamentHandler = async () => {
//     const formData = new FormData();
//     formData.append("tournamentTitle", input.tournamentTitle);
//     formData.append("subTitle", input.subTitle);
//     formData.append("description", input.description);
//     formData.append("category", input.category);
//     formData.append("location", input.location);
//     formData.append("startDate", input.startDate);
//     formData.append("endDate", input.endDate);
//     formData.append("registrationFee", input.registrationFee);
//     formData.append("registrationDeadline", input.registrationDeadline);
//     formData.append("maxTeams", input.maxTeams);
//     formData.append("maxAge", input.maxAge);
//     formData.append("minAge", input.minAge);
//     formData.append("tournamentThumbnail", input.tournamentThumbnail);

//     await editTournament({ tournamentId, formData });
//   };

//   const publishStatusHandler = async (action) => {
//     try {
//       const response = await publishTournament({ tournamentId, query: action });
//       if (response.data) {
//         refetch();
//         toast.success(response.data.message);
//       }
//     } catch (error) {
//       toast.error("Failed to publish or unpublish tournament");
//     }
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success(data.message || "Tournament updated successfully!");
//     }
//     if (error) {
//       toast.error(error.data.message || "Failed to update tournament");
//     }
//   }, [isSuccess, error]);

//   if (tournamentByIdLoading) return <h1>Loading...</h1>;

//   return (
//     <Card>
//       <CardHeader className="flex flex-row justify-between">
//         <div>
//           <CardTitle>Edit Tournament</CardTitle>
//           <CardDescription>
//             Update tournament details and save changes.
//           </CardDescription>
//         </div>

//         <div className="space-x-2">
//           <Button
//             disabled={tournamentByIdData?.tournament.length === 0}
//             variant="outline"
//             onClick={() =>
//               publishStatusHandler(
//                 tournamentByIdData?.tournament.isPublished ? "false" : "true"
//               )
//             }
//           >
//             {tournamentByIdData?.tournament.isPublished
//               ? "Unpublished"
//               : "Publish"}
//           </Button>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4 mt-4">
//           <div>
//             <Label className="mb-2 block">Title*</Label>
//             <Input
//               type="text"
//               name="tournamentTitle"
//               value={input.tournamentTitle}
//               onChange={changeEventHandler}
//               placeholder="Tournament Title"
//             />
//           </div>

//           <div>
//             <Label className="mb-2 block">Subtitle*</Label>
//             <Input
//               type="text"
//               name="subTitle"
//               value={input.subTitle}
//               onChange={changeEventHandler}
//               placeholder="Tournament Subtitle"
//             />
//           </div>

//           <div>
//             <Label className="mb-2 block">Description*</Label>
//             <textarea
//               id="description"
//               name="description"
//               value={input.description}
//               onChange={changeEventHandler}
//               placeholder="Write about the tournament..."
//               className="w-full min-h-[120px] resize-none rounded-md border border-gray-300 p-3 text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//               required
//             />
//           </div>

//           <div>
//             <Label className="mb-2 block">Location*</Label>
//             <Input
//               type="text"
//               name="location"
//               value={input.location}
//               onChange={changeEventHandler}
//               placeholder="Ex. Indore"
//             />
//           </div>

//           <div>
//             <Label className="mb-2 block">Registration Deadline*</Label>
//             <Input
//               type="date"
//               name="registrationDeadline"
//               value={input.registrationDeadline}
//               onChange={changeEventHandler}
//             />
//           </div>

//           <div>
//             <Label className="mb-2 block">Start of Tournament*</Label>
//             <Input
//               type="date"
//               name="startDate"
//               value={input.startDate}
//               onChange={changeEventHandler}
//             />
//           </div>

//           <div>
//             <Label className="mb-2 block">End of Tournament*</Label>
//             <Input
//               type="date"
//               name="endDate"
//               value={input.endDate}
//               onChange={changeEventHandler}
//             />
//           </div>

//           <div>
//             <Label className="mb-2 block">Registration Fee (INR*)</Label>
//             <Input
//               type="number"
//               name="registrationFee"
//               value={input.registrationFee}
//               onChange={changeEventHandler}
//               placeholder="Ex. 499"
//             />
//           </div>

//           <div>
//             <Label>Max Teams*</Label>
//             <Input
//               type="number"
//               name="maxTeams"
//               value={input.maxTeams}
//               onChange={changeEventHandler}
//               placeholder="Ex. 32"
//             />
//           </div>

//           <div>
//             <Label>Min Age*</Label>
//             <Input
//               type="number"
//               name="minAge"
//               value={input.minAge}
//               onChange={changeEventHandler}
//               placeholder="Ex. 18"
//             />
//           </div>

//           <div>
//             <Label>Max Age*</Label>
//             <Input
//               type="number"
//               name="maxAge"
//               value={input.maxAge}
//               onChange={changeEventHandler}
//               placeholder="Ex. 40"
//             />
//           </div>

//           <div>
//             <Label>Tournament Thumbnail*</Label>
//             <Input
//               type="file"
//               onChange={selectThumbnail}
//               accept="image/*"
//               className="w-fit"
//             />
//             {previewThumbnail && (
//               <img
//                 src={previewThumbnail}
//                 className="e-14 my-2"
//                 alt="Tournament Thumbnail"
//               />
//             )}
//           </div>

//           <div className="flex justify-end space-x-3">
//             <Button
//               variant="outline"
//               onClick={() => navigate("/admin/tournament")}
//             >
//               Cancel
//             </Button>
//             <Button disabled={isLoading} onClick={updateTournamentHandler}>
//               {isLoading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
//                 </>
//               ) : (
//                 "Save"
//               )}
//             </Button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default TournamentTab;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  Loader2,
  Upload,
  CalendarDays,
  MapPin,
  Users,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useEditTournamentMutation,
  useGetTournamentByIdQuery,
  // usePublishTournamentMutation,
} from "@/features/api/tournamentApi";

const TournamentTab = () => {
  const [input, setInput] = useState({
    tournamentTitle: "",
    subTitle: "",
    description: "",
    category: "",
    startDate: "",
    endDate: "",
    tournamentThumbnail: "",
    location: "",
    registrationFee: "",
    registrationDeadline: "",
    maxTeams: "",
    maxAge: "",
    minAge: "",
  });

  const params = useParams();
  const tournamentId = params.tournamentId;

  const {
    data: tournamentByIdData,
    isLoading: tournamentByIdLoading,
    refetch,
  } = useGetTournamentByIdQuery(tournamentId);

  // const [publishTournament] = usePublishTournamentMutation();
  const [editTournament, { data, isLoading, isSuccess, error }] =
    useEditTournamentMutation();

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (tournamentByIdData?.tournament) {
      const t = tournamentByIdData.tournament;
      setInput({
        tournamentTitle: t.tournamentTitle,
        subTitle: t.subTitle,
        description: t.description,
        category: t.category,
        location: t.location,
        startDate: t.startDate,
        endDate: t.endDate,
        registrationFee: t.registrationFee,
        registrationDeadline: t.registrationDeadline,
        maxTeams: t.maxTeams,
        maxAge: t.maxAge,
        minAge: t.minAge,
        tournamentThumbnail: "",
      });
    }
  }, [tournamentByIdData]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, tournamentThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateTournamentHandler = async () => {
    const formData = new FormData();
    for (const key in input) {
      formData.append(key, input[key]);
    }
    await editTournament({ tournamentId, formData });
  };

  // const publishStatusHandler = async (action) => {
  //   try {
  //     const response = await publishTournament({ tournamentId, query: action });
  //     if (response.data) {
  //       refetch();
  //       toast.success(response.data.message);
  //     }
  //   } catch {
  //     toast.error("Failed to publish or unpublish tournament");
  //   }
  // };

  useEffect(() => {
    if (isSuccess)
      toast.success(data?.message || "Tournament updated successfully!");
    if (error)
      toast.error(error?.data?.message || "Failed to update tournament");
  }, [isSuccess, error]);

  if (tournamentByIdLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-blue-500 w-8 h-8" />
      </div>
    );

  return (
    <Card className="shadow-md border border-gray-200">
      <CardHeader className="flex flex-row justify-between items-center bg-gradient-to-r from-blue-50 to-white border-b">
        <div>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Edit Tournament
          </CardTitle>
          <CardDescription>
            Update tournament details and save changes.
          </CardDescription>
        </div>

        {/* <div className="space-x-2">
          <Button
            variant={
              tournamentByIdData?.tournament.isPublished
                ? "destructive"
                : "outline"
            }
            onClick={() =>
              publishStatusHandler(
                tournamentByIdData?.tournament.isPublished ? "false" : "true"
              )
            }
          >
            {tournamentByIdData?.tournament.isPublished
              ? "Unpublish"
              : "Publish"}
          </Button>
        </div> */}
      </CardHeader>

      <CardContent className="space-y-6 mt-4">
        {/* Title */}
        <div>
          <Label>Title*</Label>
          <Input
            name="tournamentTitle"
            value={input.tournamentTitle}
            onChange={changeEventHandler}
            placeholder="Tournament Title"
            className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>

        {/* Subtitle */}
        <div>
          <Label>Subtitle*</Label>
          <Input
            name="subTitle"
            value={input.subTitle}
            onChange={changeEventHandler}
            placeholder="Tournament Subtitle"
            className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>

        {/* Description */}
        <div>
          <Label>Description*</Label>
          <textarea
            id="description"
            name="description"
            value={input.description}
            onChange={changeEventHandler}
            placeholder="Write about the tournament..."
            className="w-full min-h-[130px] mt-1 resize-none rounded-md border
             border-gray-300 p-3 text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            required
          />
        </div>

        {/* Location */}
        <div>
          <Label>Location*</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-700 w-4 h-4" />
            <Input
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              placeholder="Ex. Indore"
              className="pl-9 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Registration Deadline*</Label>
            <Input
              type="date"
              name="registrationDeadline"
              value={input.registrationDeadline}
              onChange={changeEventHandler}
              className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <Label>Start Date*</Label>
            <Input
              type="date"
              name="startDate"
              value={input.startDate}
              onChange={changeEventHandler}
              className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <Label>End Date*</Label>
            <Input
              type="date"
              name="endDate"
              value={input.endDate}
              onChange={changeEventHandler}
              className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div>
            <Label>Registration Fee (INR)*</Label>
            <Input
              type="number"
              name="registrationFee"
              value={input.registrationFee}
              onChange={changeEventHandler}
              placeholder="Ex. 499"
              className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Fees & Team Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Max Teams*</Label>
            <Input
              type="number"
              name="maxTeams"
              value={input.maxTeams}
              onChange={changeEventHandler}
              placeholder="Ex. 32"
              className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <div className="flex items-center gap-3">
              {/* Min Age */}
              <div className="flex flex-col w-full">
                <Label htmlFor="minAge" className="text-sm">
                  Min Age*
                </Label>
                <Input
                  id="minAge"
                  type="number"
                  name="minAge"
                  value={input.minAge}
                  onChange={changeEventHandler}
                  placeholder="Min"
                  className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              {/* Max Age */}
              <div className="flex flex-col w-full">
                <Label htmlFor="maxAge" className="text-sm">
                  Max Age*
                </Label>
                <Input
                  id="maxAge"
                  type="number"
                  name="maxAge"
                  value={input.maxAge}
                  onChange={changeEventHandler}
                  placeholder="Max"
                  className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>

        {/* Thumbnail Upload */}
        <div>
          <Label>Tournament Thumbnail*</Label>
          <div className="flex items-center gap-4 mt-2">
            <label className="flex items-center gap-2 cursor-pointer border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-all">
              <Upload className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">Choose file</span>
              <input
                type="file"
                onChange={selectThumbnail}
                accept="image/*"
                className="hidden"
              />
            </label>

            {previewThumbnail && (
              <img
                src={previewThumbnail}
                alt="Thumbnail Preview"
                className="w-20 h-20 rounded-md border object-cover"
              />
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/tournament")}
          >
            Cancel
          </Button>
          <Button disabled={isLoading} onClick={updateTournamentHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TournamentTab;
