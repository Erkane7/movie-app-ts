import { ArrowRight } from "lucide-react";
import { MovieCard } from "./MovieCard";
import { useEffect, useState } from "react";
import { getMoreMovies } from "@/services/getMoremovies";
import Link from "next/link";
import { SkeletonCard } from "./Skelton";

export const MoreLikeMovie = ({ id }) => {
  const [moreLikeMovie, setMoreLikeMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sliceCount, setSliceCount] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSliceCount(2);
      } else {
        setSliceCount(5);
      }
    };
    handleResize();
    return handleResize;
  }, []);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const getMoreLikeMovie = async () => {
      const response = await getMoreMovies(id);
      setMoreLikeMovie(response?.results);
      setLoading(false);
    };
    getMoreLikeMovie();
  }, [id]);

  if (loading)
    return (
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: sliceCount }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );

  return (
    <div className="flex justify-center w-full px-4 mt-12">
      <div className="flex flex-col w-full gap-6 max-w-7xl">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">More like this</h1>
          <Link href={`/More/${id}`}>
            <div className="flex items-center gap-2 text-sm text-gray-500 transition-colors cursor-pointer hover:text-gray-700">
              <span>See more</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {moreLikeMovie?.slice(0, sliceCount).map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              vote_average={movie.vote_average}
              poster_path={movie.poster_path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
