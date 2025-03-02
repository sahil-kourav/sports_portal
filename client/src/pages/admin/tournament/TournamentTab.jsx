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
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const TournamentTab = () => {
  
  const [input, setInput] = useState({
    tournamentTitle: "",
    subTitle: "",
    description: "",
    category: "",
    tournamentPrice: "",
    tournamentThumbnail: "",
  });

  const params = useParams();
  const tournamentId = params.tournamentId;
  const { data: tournamentByIdData, isLoading: tournamentByIdLoading , refetch} =
    useGetTournamentByIdQuery(tournamentId);

    const [publishTournament, {}] = usePublishTournamentMutation();
 
  useEffect(() => {
    if (tournamentByIdData?.tournament) { 
        const tournament = tournamentByIdData?.tournament;
      setInput({
        tournamentTitle: tournament.tournamentTitle,
        subTitle: tournament.subTitle,
        description: tournament.description,
        category: tournament.category,
        tournamentPrice: tournament.tournamentPrice,
        tournamentThumbnail: "",
      });
    }
  }, [tournamentByIdData]);

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const navigate = useNavigate();

  const [editTournament, { data, isLoading, isSuccess, error }] =
    useEditTournamentMutation();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
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
    const formData = new FormData();
    formData.append("courseTitle", input.tournamentTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("coursePrice", input.tournamentPrice);
    formData.append("tournamentThumbnail", input.tournamentThumbnail);

    await editTournament({ formData, tournamentId });
  };

  const publishStatusHandler = async (action) => {
    try {
      const response = await publishTournament({tournamentId, query:action});
      if(response.data){
        refetch();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to publish or unpublish tournament");
    }
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Tournament update.");
    }
    if (error) {
      toast.error(error.data.message || "Failed to update tournament");
    }
  }, [isSuccess, error]);

  if(tournamentByIdLoading) return <h1>Loading...</h1>
 
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Tournament Information</CardTitle>
          <CardDescription>
            Make changes to your tournament here. Click save when you're done.
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button disabled={tournamentByIdData?.tournament.length === 0} variant="outline" onClick={()=> publishStatusHandler(tournamentByIdData?.tournament.isPublished ? "false" : "true")}>
            {tournamentByIdData?.tournament.isPublished ? "Unpublished" : "Publish"}
          </Button>
          <Button>Remove Tournament</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="courseTitle"
              value={input.tournamentTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Fullstack developer"
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Become a Fullstack developer from zero to hero in 2 months"
            />
          </div>
          <div>
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>
          <div className="flex items-center gap-5">
            <div>
              <Label>Category</Label>
              <Select
                defaultValue={input.category}
                onValueChange={selectCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="Next JS">Next JS</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Frontend Development">
                      Frontend Development
                    </SelectItem>
                    <SelectItem value="Fullstack Development">
                      Fullstack Development
                    </SelectItem>
                    <SelectItem value="MERN Stack Development">
                      MERN Stack Development
                    </SelectItem>
                    <SelectItem value="Javascript">Javascript</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="Docker">Docker</SelectItem>
                    <SelectItem value="MongoDB">MongoDB</SelectItem>
                    <SelectItem value="HTML">HTML</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Price in (INR)</Label>
              <Input
                type="number"
                name="tournamentPrice"
                value={input.tournamentPrice}
                onChange={changeEventHandler}
                placeholder="199"
                className="w-fit"
              />
            </div>
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
                className="e-64 my-2"
                alt="Course Thumbnail"
              />
            )}
          </div>
          <div>
            <Button onClick={() => navigate("/admin/tournament")} variant="outline">
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={updateTournamentHandler}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TournamentTab;
