import React, { useState } from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Movie } from "@/types";
import Trailer from "./Trailer";

const MyCarouselItem: React.FC<Movie> = ({
  title,
  vote_average,
  backdrop_path,
  overview,
  id,
}) => {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <div className="relative max-w-screen md:h-[600px] lg:h-[900px]">
      {loading && (
        <div className="w-full h-[600px] md:h-[900px] bg-gray-300 animate-pulse rounded-2xl"></div>
      )}

      <Link
        href={`/details/${id}`}
        className={`inline-flex items-center gap-2 px-5 py-2 rounded-md bg-white text-black font-medium hover:bg-gray-100 transition ${
          loading ? "hidden" : "block"
        }`}
      >
        <Image
          priority={true}
          src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${backdrop_path}`}
          width={1680}
          height={100}
          alt="Featured"
          className="overflow-hidden rounded-2xl max-w-full h-full"
          onLoadingComplete={() => setLoading(false)}
        />
      </Link>

      {!loading && (
        <div className="sm:absolute sm:text-white md:absolute top-80 left-0 flex items-center px-6 sm:px-20 md:px-20">
          <div className="max-w-xl space-y-4">
            <h4 className="text-lg md:text-xl font-light">Now Playing:</h4>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              {title}
            </h1>

            <div className="flex items-center gap-2 text-lg">
              <Star className="text-yellow-400" />
              <span className="text-white text-sm">
                {vote_average.toFixed(1)}/10
              </span>
            </div>

            <p className="text-sm md:text-base text-black-200">{overview}</p>
            <Trailer movieId={id} />
            <div className="flex gap-4 mt-4"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCarouselItem;
