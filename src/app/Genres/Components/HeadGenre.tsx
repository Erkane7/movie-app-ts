import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ArrowDownNarrowWide } from "lucide-react";
import { Button } from "../../../Components/ui/button";
import { Genres } from "./Genres";

export function HeadGenre() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <ArrowDownNarrowWide className="mr-2" />
          <Genres />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-5 w-100">
        <DropdownMenuLabel className="font-bold">Genres</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Genres />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
