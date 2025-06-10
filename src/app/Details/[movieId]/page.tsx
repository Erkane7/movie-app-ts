"use client";

import { MovieDescription } from "@/app/Details/[movieId]/Components/MovieDescription";
import { MovieFrame } from "@/app/Details/[movieId]/Components/MovieFrame";
import { MoreLikeMovie } from "@/Components/MovieMoreLike";
import { getMovieById } from "@/services/getMovieById";
import { Movie } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  let movieId = router.query.movieId;

  if (Array.isArray(movieId)) {
    movieId = movieId[0];
  }

  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (!movieId) return;

    const getMovie = async () => {
      try {
        const data = await getMovieById(movieId);
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie:", error);
        setMovie(null);
      }
    };

    getMovie();
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
