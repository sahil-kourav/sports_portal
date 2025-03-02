import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import TournamentTab from "./TournamentTab";

const EditTournament = () => {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-xl">
          Add detail information regarding Tournament
        </h1>
        {/* <Link to="lecture"> */}
          <Button className="hover:text-blue-600" variant="link">Go to lectures page</Button>
        {/* </Link> */}
      </div>
      <TournamentTab/>
    </div>
  );
};

export default EditTournament;
