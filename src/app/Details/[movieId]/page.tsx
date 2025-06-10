"use client";

import { MovieDescription } from "@/app/details/[movieId]/Components/MovieDescription";
import { MovieFrame } from "@/app/details/[movieId]/Components/MovieFrame";
import { MoreLikeMovie } from "@/Components/MovieMoreLike";
import { getMovieById } from "@/services/getMovieById";
import { Movie } from "@/types";
import { use, useEffect, useState } from "react";

export default function Page({ params }: { params: Promise<{ movieId: string }> }) {
  const { movieId } = use(params);

  const [movie, setMovie] = useState<Movie | null>(null);

useEffect(() => {
  if (!movieId) return;

  (async () => {
    try {
      const data = await getMovieById(movieId);
      setMovie(data);
    } catch (error) {
      console.error("Failed to fetch movie:", error);
      setMovie(null);
    }
  })();
}, [movieId]);

  if (!movieId) {
    return <p>Loading movie...</p>;
  }

  return (
    <div>
      <MovieFrame
        id={movieId}
        movie={movie}
        poster_path={movie?.poster_path}
        backdrop_path={movie?.backdrop_path}
      />
      {movie && <MovieDescription movie={movie} id={movieId} />}
      <MoreLikeMovie id={movieId} />
    </div>
  );
}
