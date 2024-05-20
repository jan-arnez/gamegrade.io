import { Info } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const InfoButton: React.FC = () => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        size="icon"
        variant="outline"
        className="aspect-square text-muted-foreground hover:text-foreground"
      >
        <Info className="text-inherit" />
      </Button>
    </PopoverTrigger>
    <PopoverContent>
      <p>
        You will have limited or unlimited time to solve the desired amount of
        questions based on data you provided.
      </p>
    </PopoverContent>
  </Popover>
);

export default InfoButton;
