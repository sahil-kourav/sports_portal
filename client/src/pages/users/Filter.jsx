import { Checkbox } from "@/components/ui/checkbox";
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
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";

const tournaments = [
  { id: "cricket", label: "Cricket" },
  { id: "football", label: "Football" },
  { id: "basketball", label: "Basketball" },
  { id: "badminton", label: "Badminton" },
  { id: "tennis", label: "Tennis" },
  { id: "hockey", label: "Hockey" },
  { id: "volleyball", label: "Volleyball" },
  { id: "table-tennis", label: "Table Tennis" },
  { id: "chess", label: "Chess" },
  { id: "kabaddi", label: "Kabaddi" },
  { id: "swimming", label: "Swimming" },
  { id: "other", label: "Other" },
];

const Filter = ({ handleFilterChange }) => {
  const [selectedTournaments, setSelectedTournaments] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const handleTournamentChange = (tournamentId) => {
    setSelectedTournaments((prevTournaments) => {
      const newTournaments = prevTournaments.includes(tournamentId)
        ? prevTournaments.filter((id) => id !== tournamentId)
        : [...prevTournaments, tournamentId];

      handleFilterChange(newTournaments, sortByPrice);
      return newTournaments;
    });
  };

  const selectByPriceHandler = (selectedValue) => {
    setSortByPrice(selectedValue);
    handleFilterChange(selectedTournaments, selectedValue);
  };

  return (
    <div className="w-full md:w-[20%]">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-xl">Filter Options</h1>
        <Select onValueChange={selectByPriceHandler}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by price</SelectLabel>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Separator className="my-4" />
      <div>
        <h1 className="font-semibold mb-2">TOURNAMENT CATEGORY</h1>
        {tournaments.map((tournament) => (
          <div key={tournament.id} className="flex items-center space-x-2 my-2">
            <Checkbox
              id={tournament.id}
              onCheckedChange={() => handleTournamentChange(tournament.id)}
            />
            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {tournament.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
