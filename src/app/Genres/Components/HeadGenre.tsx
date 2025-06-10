import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ArrowDownNarrowWide } from "lucide-react";
import { Genres } from "./Genres";

export function HeadGenre() {
  return (
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <button className="inline-flex items-center">
      <ArrowDownNarrowWide className="mr-2" />
      Genres
    </button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="ml-5 w-100">
    <DropdownMenuLabel className="font-bold">Genres</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <Genres />
  </DropdownMenuContent>
</DropdownMenu>

  );
}
