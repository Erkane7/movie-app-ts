"use client";
import { useEffect, useState } from "react";
import { Movie } from "../types";
import { MovieCarousel } from "@/Components/MovieCarousel";
import { Popular } from "@/Components/Popular";
import { TopRated } from "@/Components/TopRated";
import { Upcoming } from "@/Components/Upcoming";

export default function Home() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);

  const getNowPlayingMovies = async (): Promise<void> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/movie/now_playing?language=en-US&page=1`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setNowPlayingMovies(data.results as Movie[]);
    } catch (error) {
      console.error("Failed to fetch now playing movies:", error);
    }
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);

  return (
    <div>
      <MovieCarousel nowPlayingMovie={nowPlayingMovies} />
      <Upcoming />
      <Popular />
      <TopRated />
    </div>
  );
}
