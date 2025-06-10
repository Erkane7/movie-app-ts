import React from "react";
import { Film } from "lucide-react";
import Link from "next/link";
import { HeadGenre } from "../app/Genres/Components/HeadGenre";
import { SearchInput } from "./SearchInput";
import { ModeToggle } from "./Darkmode";

const Header: React.FC = () => {
  return (
    <header className="h-9 px-4 mt-4 bg-white dark:bg-gray-900">
      <div className="w-full max-w-[1280px] mx-auto flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 cursor-pointer">
            <Film />
            <span className="font-bold italic text-lg">Movie Z</span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <HeadGenre />

          <div className="relative w-[379px] h-9 sm:block hidden">
            <SearchInput />
          </div>
        </div>

        <div className="flex gap-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
