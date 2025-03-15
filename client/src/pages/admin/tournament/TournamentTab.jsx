import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import RichTextEditor from "@/components/RichTextEditor";
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useEditTournamentMutation,
  useGetTournamentByIdQuery,
  usePublishTournamentMutation,
} from "@/features/api/tournamentApi";

const TournamentTab = () => {
  const [input, setInput] = useState({
    tournamentTitle: "",
    subTitle: "",
    description: "",
    category: "",
    tournamentThumbnail: "",
    location: "",
    registrationFee: "",
    registrationDeadline: "",
    status: "",
    maxTeams: "",
    contactInfo: "",
  });


  const params = useParams();
  const tournamentId = params.tournamentId;

  const { data: tournamentByIdData, isLoading: tournamentByIdLoading, refetch } =
    useGetTournamentByIdQuery(tournamentId);

  const [publishTournament, { }] = usePublishTournamentMutation();
  const [editTournament, { data, isLoading, isSuccess, error }] =
    useEditTournamentMutation();

  useEffect(() => {
    if (tournamentByIdData?.tournament) {
      const tournament = tournamentByIdData?.tournament;
      setInput({
        tournamentTitle: tournament.tournamentTitle,
        subTitle: tournament.subTitle,
        description: tournament.description,
        category: tournament.category,
        location: tournament.location,
        registrationFee: tournament.registrationFee,
        registrationDeadline: tournament.registrationDeadline,
        status: tournament.status,
        maxTeams: tournament.maxTeams,
        contactInfo: tournament.contactInfo,
        tournamentThumbnail: "",
      });
    }
  }, [tournamentByIdData]);

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // get file
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
    try {
      const formData = new FormData();
      Object.keys(input).forEach((key) => {
        formData.append(key, input[key]);
      });

      const response = await editTournament({ tournamentId, formData });

      if (response?.data) {
        toast.success("Tournament updated successfully!");
        navigate("/admin/tournament");
      }
    } catch (error) {
      toast.error("Failed to update tournament");
    }
  };


  const publishStatusHandler = async (action) => {
    try {
      const response = await publishTournament({ tournamentId, query: action });
      if (response.data) {
        refetch();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to publish or unpublish tournament");
    }
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Tournament updated successfully!");
    }
    if (error) {
      toast.error(error.data.message || "Failed to update tournament");
    }
  }, [isSuccess, error]);

  if (tournamentByIdLoading) return <h1>Loading...</h1>;

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Edit Tournament</CardTitle>
          <CardDescription>Update tournament details and save changes.</CardDescription>
        </div>

        <div className="space-x-2">
          <Button disabled={tournamentByIdData?.tournament.length === 0} variant="outline" onClick={() => publishStatusHandler(tournamentByIdData?.tournament.isPublished ? "false" : "true")}>
            {tournamentByIdData?.tournament.isPublished ? "Unpublished" : "Publish"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-2">
          <div>
            <Label className="mb-2 block">Title</Label>
            <Input type="text" name="tournamentTitle" value={input.tournamentTitle} onChange={changeEventHandler} placeholder="Tournament Title" />
          </div>

          <div>
            <Label className="mb-2 block">Subtitle</Label>
            <Input type="text" name="subTitle" value={input.subTitle} onChange={changeEventHandler} placeholder="Tournament Subtitle" />
          </div>

          <div>
            <Label className="mb-2 block">Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>

          <div>
            <Label className="mb-2 block">Location</Label>
            <Input type="text" name="location" value={input.location} onChange={changeEventHandler} placeholder="Ex. Indore" />
          </div>

          <div>
            <Label className="mb-2 block">registrationDeadline</Label>
            <Input type="date" name="registrationDeadline" value={input.registrationDeadline} onChange={changeEventHandler} />
          </div>
          
          <div>
            <Label className="mb-2 block">Registration Fee (INR)</Label>
            <Input type="number" name="registrationFee" value={input.registrationFee} onChange={changeEventHandler} placeholder="Ex. 499" />
          </div>

          <div>
            <Label className="mb-2 block">Status</Label>
            <Select name="status" value={input.status} onValueChange={(val) => setInput({ ...input, status: val })}>
              <SelectTrigger><SelectValue placeholder="Select Status" /></SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Upcoming">Upcoming</SelectItem>
                  <SelectItem value="Ongoing">Ongoing</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Max Teams</Label>
            <Input type="number" name="maxTeams" value={input.maxTeams} onChange={changeEventHandler} placeholder="Ex. 32" />
          </div>

          <div>
            <Label>Contact Number</Label>
            <Input type="text" name="contactInfo" value={input.contactInfo} onChange={changeEventHandler} placeholder="Ex. +91 9876543210" />
          </div>

          <div>
            <Label>Tournament Thumbnail</Label>
            <Input
              type="file"
              onChange={selectThumbnail}
              accept="image/*"
              className="w-fit"
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="e-14 my-2"
                alt="Tournament Thumbnail"
              />
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => navigate("/admin/tournament")}>
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={updateTournamentHandler}>
              {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</> : "Save"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TournamentTab;
