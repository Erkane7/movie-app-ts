import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { MovieCard } from "./MovieCard";
import { useEffect, useState } from "react";
import { getTopRatedMovies } from "@/services/getTopRatedMovies";
import { SkeletonCard } from "./Skelton";

export const TopRated = () => {
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getTopRated = async () => {
      const response = await getTopRatedMovies();
      setTopRated(response?.results || []);
      setLoading(false);
    };
    getTopRated();
  }, []);

  if (loading)
    return (
      <div>
        {Array.from({ length: 10 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );

  return (
    <div className="w-full flex justify-center px-4 mt-12 mb-12">
      <div className="max-w-7xl w-full flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Toprated</h1>
          <Link href={`/category/top_rated`}>
            <div className="flex items-center gap-6 text-sm text-gray-500 cursor-pointer">
              <span>See more</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {topRated &&
            topRated
              .slice(0, 10)
              .map((movie) => (
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
