import { Play, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { SkeletonCard } from "../../../../Components/Skelton";
import Trailer from "@/Components/Trailer";

export const MovieFrame = ({ movie, poster_path, backdrop_path, id }) => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const getTrailer = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}movie/${id}/videos?language=en-US`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        }
      );
      const data = await response.json();
      setVideo(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!id) return;
    getTrailer();
  }, [id]);

  if (loading)
    return (
      <div className="relative flex gap-6 px-4 pb-8">
        <SkeletonCard width={290} height={430} />
      </div>
    );

  return (
    <div className="flex flex-col mx-auto mt-12 rounded-lg shadow-md overflow-hidden max-w-[1280px] bg-white dark:bg-gray-900">
      <div className="flex justify-between px-4 py-4">
        <div>
          <p className="text-4xl font-bold text-gray-900 dark:text-white">
            {movie?.title}
          </p>
          <span className="text-gray-700 dark:text-gray-300">
            {movie?.release_date}
          </span>
          <span className="text-gray-700 dark:text-gray-300">
            {" "}
            {Math.floor(movie?.runtime / 60)}h {movie?.runtime % 60}m
          </span>
        </div>
        <div className="flex flex-col gap-2 text-right">
          <p className="text-lg text-gray-900 dark:text-white">Rating:</p>
          <div className="flex items-center gap-3">
            <Star className="text-yellow-400" />
            <div className="text-sm text-gray-900 dark:text-gray-300">
              <span className="font-bold">
                {typeof movie?.vote_average === "number"
                  ? movie.vote_average.toFixed(1)
                  : "N/A"}
              </span>
              <span>/10</span>
              <p>{movie?.vote_count} votes</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex gap-6 px-4 pb-8">
        <Image
          priority={true}
          src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${poster_path}`}
          width={290}
          height={430}
          className="rounded-md"
          alt={`${movie?.title} poster`}
        />

        <div className="relative">
          <div className="absolute ml-12 mt-110">
            <Trailer movieId={id} />
          </div>
          <Image
            priority={true}
            src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${backdrop_path}`}
            width={1000}
            height={430}
            className="object-cover rounded-md"
            alt={`${movie?.title} backdrop`}
          />
        </div>
      </div>
    </div>
  );
};
