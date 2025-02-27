import React, { useState } from "react";
import { Command, CommandInput, CommandItem, CommandList } from "../components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Check } from "lucide-react";
import Interest from "@/data/models/Interest";

interface MultiSelectProps {
  interests: Interest[];
  selectedInterests: number[];
  setSelectedInterests: React.Dispatch<React.SetStateAction<number[]>>;
}

const MultiSelectInterests: React.FC<MultiSelectProps> = ({ interests, selectedInterests, setSelectedInterests }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const toggleSelection = (id: number) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Sélectionner les centres d'intérêt
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-between w-full">
            {selectedInterests.length > 0
              ? `${selectedInterests.length} sélectionné(s)`
              : "Choisir les centres d'intérêt"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-2">
          <Command>
            <CommandInput placeholder="Rechercher..." value={search} onValueChange={setSearch} />
            <CommandList className="overflow-y-auto max-h-60">
              {interests
                .filter((interest) => interest.title.toLowerCase().includes(search.toLowerCase()))
                .map((interest) => (
                  <CommandItem
                    key={interest.id}
                    value={interest.title}
                    onSelect={() => toggleSelection(interest.id)}
                    className="flex justify-between cursor-pointer"
                  >
                    {interest.title}
                    {selectedInterests.includes(interest.id) && <Check className="w-4 h-4 text-primary" />}
                  </CommandItem>
                ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedInterests.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {interests
            .filter((interest) => selectedInterests.includes(interest.id))
            .map((interest) => (
              <Badge key={interest.id} variant="secondary" className="flex items-center gap-2">
                {interest.title}
                <button
                  type="button"
                  onClick={() => toggleSelection(interest.id)}
                  className="text-lg leading-none text-red-500 hover:text-red-700"
                >
                  &times;
                </button>
              </Badge>
            ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectInterests;
