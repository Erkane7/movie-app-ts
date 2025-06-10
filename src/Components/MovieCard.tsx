import { Movie } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type MovieCardProps = Movie;

export const MovieCard = ({
  title,
  vote_average,
  poster_path,
  id,
}: MovieCardProps) => {
  return (
    <Link href={`/details/${id}`}>
      <div className="rounded-lg shadow-md overflow-hidden w-full max-w-[240px] h-[440px] cursor-pointer hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${poster_path}`}
          width={230}
          height={340}
          alt={`${title} poster`}
          style={{ height: "auto" }}
          priority
        />
        <div className="bg-gray-100 px-4 py-3 h-full dark:bg-gray-900">
          <p className="flex items-center text-sm text-gray-900 dark:text-white">
            <span className="font-semibold dark:text-white">
              {vote_average.toFixed(1)}
            </span>
            <span className="text-gray-500 ml-1 dark:text-gray-100">/10</span>
          </p>
          <h2 className="text-md font-medium mt-1 dark:text-white">{title}</h2>
        </div>
      </div>
    </Link>
  );
};
